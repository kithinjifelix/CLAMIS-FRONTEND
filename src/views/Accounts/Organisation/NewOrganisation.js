import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {Button, Card, Col, Row} from "react-bootstrap";
import { Form, TextArea, Input } from 'semantic-ui-react';
import {getAll, post, put} from "../../../services/Api";
import {useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function NewOrganisation() {
    const { register, setValue, handleSubmit, formState: {errors} } = useForm();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [contact, setContact] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const history = useHistory();
    const params = useParams();

    const loadOrganisation = useCallback(async () => {
        if (params && params.id) {
            const orgRes = await getAll(`organisations/get/${params.id}`);
            if (orgRes.status === 200) {
                setName(orgRes.data.name);
                setValue('name', orgRes.data.name);
                setDescription(orgRes.data.description);
                setValue('description', orgRes.data.description);
                setContact(orgRes.data.contact);
                setValue('contact', orgRes.data.contact);
                setEmail(orgRes.data.email);
                setValue('email', orgRes.data.email);
                setPhone(orgRes.data.phone);
                setValue('phone', orgRes.data.phone);
            } else if (orgRes.status === 400) {
                await Swal.fire('Oops...', orgRes.data.message, 'error');
            }
        }
    },[]);

    useEffect(() => {
        loadOrganisation();
    }, [loadOrganisation]);

    const onSubmit = async (data) => {
        let result = null;
        if (params && params.id) {
            result = await put(`organisations/put/${params.id}`, data);
        } else {
            result = await post('organisations/create', data);
        }
        if (result) {

        }
        if (result.status === 200) {
            await Swal.fire('Success', 'Successfully registered organisation', 'success');
            history.push('/registration/organisations');
        } else if (result.status === 400) {
            await Swal.fire('Oops...', result.data.message, 'error');
        }
    };

    const setOrganisationName = (e) => {
        setName(e.target.value);
    }

    const setOrganisationDescription = (e) => {
        setDescription(e.target.value);
    }

    const setOrganisationContact = (e) => {
        setContact(e.target.value);
    }

    const setOrganisationEmail = (e) => {
        setEmail(e.target.value);
    }

    const setOrganisationPhone = (e) => {
        setPhone(e.target.value);
    }

    return (
        <React.Fragment>
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
                                                <Input {...register("name", { required: true })} value={name} onChange={setOrganisationName} type="text"  />
                                                {errors.name && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Description</label>
                                                <TextArea {...register("description", { required: true })} value={String(description)} onChange={setOrganisationDescription} type="text"></TextArea>
                                                {errors.description && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Contact</label>
                                                <Input {...register("contact")} value={contact} onChange={setOrganisationContact} type="text"  />
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
                                                <Input {...register("email")} value={email} onChange={setOrganisationEmail} type="email"  />
                                                {errors.email && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Phone</label>
                                                <Input {...register("phone")} value={phone} onChange={setOrganisationPhone} type="text"  />
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
        </React.Fragment>
    );
}
