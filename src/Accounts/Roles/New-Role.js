import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {post} from "../../services/Api";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Form, Input, TextArea} from "semantic-ui-react";
import React from "react";

export default function NewRole() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const history = useHistory();

    const onSubmit = async (data) => {
        const result = await post('roles/create', data);
        if (result) {
            history.push('roles');
        }
    };

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
                                                <Input {...register("name", { required: true })} type="text"  />
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
