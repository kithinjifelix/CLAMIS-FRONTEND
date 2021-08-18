import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import Aux from "../../hoc/_Aux";
import { useHistory } from "react-router-dom";
import {getAll, deleteItem} from "../../services/Api";
import {Table} from "semantic-ui-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [isBasic, setIsBasic] = useState(false);
    const history = useHistory();

    const loadUsers = useCallback(async () => {
        const userResult = await getAll('users/get');
        setUsers(userResult);
    },[]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const routeChange = () =>{
        let path = `new-user`;
        history.push(path);
    }

    const onUserEdit = (user) => {
        let path = `new-user/${user.id}`;
        history.push(path);
    }

    const onUserDelete = (user) => {
        setUser(user);
        setIsBasic(true);
    };

    const userDeleted = async () => {
        console.log(user);
        setIsBasic(false);
        const deleteResult = await deleteItem (`users/delete/${user.id}`);
        console.log(deleteResult);
        window.location.reload();
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Users</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" onClick={routeChange}>
                                        <i className="feather icon-plus-circle"/>
                                        New User
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Table striped>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>FIRST NAME</Table.HeaderCell>
                                                <Table.HeaderCell>MIDDLE NAME</Table.HeaderCell>
                                                <Table.HeaderCell>LAST NAME</Table.HeaderCell>
                                                <Table.HeaderCell>EMAIL</Table.HeaderCell>
                                                <Table.HeaderCell>PHONE</Table.HeaderCell>
                                                <Table.HeaderCell>DATE CREATED</Table.HeaderCell>
                                                <Table.HeaderCell>ACTIONS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                users.map((user, index) => (
                                                    <Table.Row key={user.id}>
                                                        <Table.Cell>{user.firstName}</Table.Cell>
                                                        <Table.Cell>{user.middleName}</Table.Cell>
                                                        <Table.Cell>{user.lastName}</Table.Cell>
                                                        <Table.Cell>{user.email}</Table.Cell>
                                                        <Table.Cell>{user.phone}</Table.Cell>
                                                        <Table.Cell>{user.createdAt}</Table.Cell>
                                                        <Table.Cell>
                                                            <Button variant="primary" onClick={() => onUserEdit(user)}>
                                                                <i className="feather icon-edit" />
                                                            </Button>
                                                            &nbsp;&nbsp;
                                                            <Button variant="danger" onClick={() => onUserDelete(user)}>
                                                                <i className="feather icon-trash-2" />
                                                            </Button>
                                                        </Table.Cell>
                                                    </Table.Row>
                                                ))
                                            }
                                        </Table.Body>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={isBasic} onHide={() => setIsBasic(false)}>
                <Modal.Header closeButton>
                    <Modal.Title as="h5">Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete { user.firstName + " " + user.middleName + " " + user.lastName }? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsBasic(false)}>Close</Button>
                    <Button variant="primary" onClick={() => userDeleted()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </Aux>
    );
}
