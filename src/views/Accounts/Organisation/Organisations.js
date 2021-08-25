import React, {useCallback, useEffect, useState} from "react";
import {Button, Card, Col, Modal, Row} from "react-bootstrap";
import { Table } from 'semantic-ui-react';
import {deleteItem, getAll} from "../../../services/Api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function Organisations() {
    const [organisations, setOrganisations] = useState([]);
    const [organisation, setOrganisation] = useState([]);
    const [isBasic, setIsBasic] = useState(false);
    const { hasPermission } = useAuth();
    const history = useHistory();

    const loadOrganisations = useCallback(async () => {
        const organisationsResult = await getAll('organisations/get');
        if (organisationsResult.status === 200) {
            setOrganisations(organisationsResult.data);
        } else if (organisationsResult.status === 400) {
            await Swal.fire('Oops...', organisationsResult.data.message, 'error');
        }
    },[]);

    useEffect(() => {
        loadOrganisations();
    }, [loadOrganisations]);

    const routeChange = () =>{
        let path = `new-organisation`;
        history.push(path);
    };

    const onOrganisationEdit = (org) => {
        let path = `new-organisation/${org.id}`;
        history.push(path);
    };

    const onOrganisationDelete = (org) => {
        setOrganisation(org);
        setIsBasic(true);
    };

    const organisationDeleted = async () => {
        setIsBasic(false);
        const result = await deleteItem (`organisations/delete/${organisation.id}`);
        if (result.status === 200) {
            await Swal.fire('Success', 'Successfully deleted organisation', 'success');
            window.location.reload();
        } else if (result.status === 400) {
            await Swal.fire('Oops...', result.data.message, 'error');
        }
    };

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Organisation</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" onClick={routeChange} className={ hasPermission('Accounts-Organisations-Create') ? undefined : 'hidden' }>
                                        <i className="feather icon-plus-circle"/>
                                        New Organisation
                                    </Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={12}>
                                    <Table striped>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>NAME</Table.HeaderCell>
                                                <Table.HeaderCell>DESCRIPTION</Table.HeaderCell>
                                                <Table.HeaderCell>CONTACT</Table.HeaderCell>
                                                <Table.HeaderCell>EMAIL</Table.HeaderCell>
                                                <Table.HeaderCell>PHONE</Table.HeaderCell>
                                                <Table.HeaderCell>DATE CREATED</Table.HeaderCell>
                                                <Table.HeaderCell className={ (hasPermission('Accounts-Organisations-Update') && hasPermission('Accounts-Organisations-Delete')) ? undefined : 'hidden' }>ACTIONS</Table.HeaderCell>
                                            </Table.Row>
                                        </Table.Header>
                                        <Table.Body>
                                            {
                                                organisations.map((org, index) => (
                                                    <Table.Row key={org.id}>
                                                        <Table.Cell>{org.name}</Table.Cell>
                                                        <Table.Cell>{org.description}</Table.Cell>
                                                        <Table.Cell>{org.contact}</Table.Cell>
                                                        <Table.Cell>{org.email}</Table.Cell>
                                                        <Table.Cell>{org.phone}</Table.Cell>
                                                        <Table.Cell>{org.createdAt}</Table.Cell>
                                                        <Table.Cell className={ (hasPermission('Accounts-Organisations-Update') && hasPermission('Accounts-Organisations-Delete')) ? undefined : 'hidden' }>
                                                            <Button variant="primary" onClick={() => onOrganisationEdit(org)} className={ hasPermission('Accounts-Organisations-Update') ? undefined : 'hidden' }>
                                                                <i className="feather icon-edit" />
                                                            </Button>
                                                            &nbsp;&nbsp;
                                                            <Button variant="danger" onClick={() => onOrganisationDelete(org)} className={ hasPermission('Accounts-Organisations-Delete') ? undefined : 'hidden' }>
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
                    <Modal.Title as="h5">Delete Organisation</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete organisation: { organisation.name }? </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setIsBasic(false)}>Close</Button>
                    <Button variant="primary" onClick={() => organisationDeleted()}>Yes</Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}
