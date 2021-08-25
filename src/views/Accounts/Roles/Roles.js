import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {deleteItem, getAll} from "../../../services/Api";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import { Table } from "semantic-ui-react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState([]);
    const [isBasic, setIsBasic] = useState(false);
    const { hasPermission } = useAuth();
    const history = useHistory();

    const loadRoles = useCallback(async () => {
        const rolesResult = await getAll('roles/get');
        if (rolesResult.status === 200) {
            setRoles(rolesResult.data);
        } else if (rolesResult.status === 400) {
            await Swal.fire('Oops...', rolesResult.data.message, 'error');
        }
    },[]);

    useEffect(() => {
        loadRoles();
    }, [loadRoles]);

    const routeChange = () => {
        let path = `new-role`;
        history.push(path);
    };

    const onRoleEdit = (role) => {
        let path = `new-role/${role.id}`;
        history.push(path);
    };

    const onRoleDelete = (role) => {
        setRole(role);
        setIsBasic(true);
    };

    const roleDeleted = async () => {
        setIsBasic(false);
        const deleteResult = await deleteItem (`roles/delete/${role.id}`);
        if (deleteResult.status === 200) {
            await Swal.fire('Success', 'Successfully deleted role', 'success');
            window.location.reload();
        } else if (deleteResult.status === 400) {
            await Swal.fire('Oops...', deleteResult.data.message, 'error');
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Roles</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" onClick={routeChange} className={ hasPermission('Accounts-Roles-Create') ? undefined : 'hidden' }>
                                        <i className="feather icon-plus-circle"/>
                                        New Role
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Table striped>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>NAME</Table.HeaderCell>
                                                <Table.HeaderCell>DATE CREATED</Table.HeaderCell>
                                                <Table.HeaderCell className={ (hasPermission('Accounts-Roles-Update') && hasPermission('Accounts-Roles-Delete')) ? undefined : 'hidden' }>ACTIONS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                roles.map((role, index) => (
                                                    <Table.Row key={role.id}>
                                                        <Table.Cell>{role.name}</Table.Cell>
                                                        <Table.Cell>{role.createdAt}</Table.Cell>
                                                        <Table.Cell className={ (hasPermission('Accounts-Roles-Update') && hasPermission('Accounts-Roles-Delete')) ? undefined : 'hidden' }>
                                                            <Button variant="primary" onClick={() => onRoleEdit(role)} className={ hasPermission('Accounts-Roles-Update') ? undefined : 'hidden' }>
                                                                <i className="feather icon-edit" />
                                                            </Button>
                                                            &nbsp;&nbsp;
                                                            <Button variant="danger" onClick={() => onRoleDelete(role)} className={ hasPermission('Accounts-Roles-Delete') ? undefined : 'hidden' }>
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
                    <Modal.Title as="h5">Delete Role</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete role: { role.name }? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsBasic(false)}>Close</Button>
                    <Button variant="primary" onClick={() => roleDeleted()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
