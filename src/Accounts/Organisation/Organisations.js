import React, {useCallback, useEffect, useState} from "react";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import { Table } from 'semantic-ui-react';
import {getAll} from "../../services/Api";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Organisations() {
    const [organisations, setOrganisations] = useState([]);
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
    }

    const onOrganisationEdit = (org) => {
        let path = `new-organisation/${org.id}`;
        history.push(path);
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Organisation</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" onClick={routeChange}>
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
                                                <Table.HeaderCell>ACTIONS</Table.HeaderCell>
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
                                                        <Table.Cell>
                                                            <Button variant="primary" onClick={() => onOrganisationEdit(org)}>
                                                                <i className="feather icon-edit" />
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
        </Aux>
    );
}
