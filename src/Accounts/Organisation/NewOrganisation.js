import React from "react";
import {useForm} from "react-hook-form";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import { Form, TextArea, Input } from 'semantic-ui-react';
import {post} from "../../services/Api";
import {useHistory} from "react-router-dom";

export default function NewOrganisation() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        const result = await post('organisations', data);
        if (result) {
            history.push('organisations');
        }
    };

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as={"h5"}>Create Organisation</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Name</label>
                                                <Input {...register("name", { required: true })} type="text"  />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Description</label>
                                                <TextArea {...register("description", { required: true })} type="text"></TextArea>
                                                {errors.description && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Contact</label>
                                                <Input {...register("contact", { required: true })} type="text"  />
                                                {errors.contact && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Email Address</label>
                                                <Input {...register("email", { required: true })} type="email"  />
                                                {errors.email && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Phone</label>
                                                <Input {...register("phone", { required: true })} type="text"  />
                                                {errors.phone && <span className="text-danger">This field is required</span>}
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
