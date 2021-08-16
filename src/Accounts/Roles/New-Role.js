import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {getAll, post, put} from "../../services/Api";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import { Form, Input } from "semantic-ui-react";
import React, {useCallback, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';

export default function NewRole() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [role, setRole] = useState('');
    const history = useHistory();
    const params = useParams();

    const loadRole = useCallback(async () => {
        if (params && params.id) {
            const roleResult = await getAll(`roles/get/${params.id}`);
            setRole(roleResult.name);
        }
    },[]);

    useEffect(() => {
        loadRole();
    }, [loadRole]);

    const onSubmit = async (data) => {
        let result = null;
        if (params && params.id) {
            result = await put(`roles/put/${params.id}`, data);
        } else {
            result = await post('roles/create', data);
        }
        if (result) {
            history.push('/registration/roles');
        }
    };

    const setRoleName = (e) => {
        setRole(e.target.value)
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Create Role</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Name</label>
                                                <Input {...register("name", { required: true })} value={role} onChange={setRoleName} type="text"  />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Button variant="primary" type="submit">
                                            <i className="feather icon-plus-circle"/>
                                            Submit
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    );
}
