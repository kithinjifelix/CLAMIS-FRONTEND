import {Button, Card, Col, Row} from "react-bootstrap";
import React, {useCallback, useEffect, useState} from "react";
import Aux from "../../hoc/_Aux";
import { useHistory } from "react-router-dom";
import {getAll} from "../../services/Api";
import {Table} from "semantic-ui-react";

export default function Users() {
    const [users, setUsers] = useState([]);
    const history = useHistory();

    const loadUsers = useCallback(async () => {
        const userResult = await getAll('users/get');
        setUsers(userResult);
    },[]);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    let orgRows = null;
    if (users && users.length > 0) {
        orgRows = users.map((org, index) => (
            <Table.Row key={org.id}>
                <Table.Cell>{org.firstName}</Table.Cell>
                <Table.Cell>{org.middleName}</Table.Cell>
                <Table.Cell>{org.lastName}</Table.Cell>
                <Table.Cell>{org.email}</Table.Cell>
                <Table.Cell>{org.phone}</Table.Cell>
                <Table.Cell>{org.createdAt}</Table.Cell>
            </Table.Row>
        ));
    }

    const routeChange = () =>{
        let path = `new-user`;
        history.push(path);
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
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>{orgRows}</Table.Body>
                                    </Table>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
