import React, {useCallback, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {getAll} from "../../services/Api";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Table} from "semantic-ui-react";

export default function Roles() {
    const [roles, setRoles] = useState([]);
    const history = useHistory();

    const loadRoles = useCallback(async () => {
        const rolesResult = await getAll('roles/get');
        setRoles(rolesResult);
    },[]);

    useEffect(() => {
        loadRoles();
    }, [loadRoles]);

    console.log(roles);
    let orgRows = null;
    if (roles && roles.length > 0) {
        orgRows = roles.map((org, index) => (
            <Table.Row key={org.id}>
                <Table.Cell>{org.name}</Table.Cell>
                <Table.Cell>{org.createdAt}</Table.Cell>
            </Table.Row>
        ));
    }

    const routeChange = () =>{
        let path = `new-role`;
        history.push(path);
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Roles</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col md={4}>
                                    <Button variant="primary" onClick={routeChange}>
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
