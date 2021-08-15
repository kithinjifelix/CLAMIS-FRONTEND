import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {getAll, post} from "../../services/Api";
import {useHistory} from "react-router-dom";
import {Form, Input} from 'semantic-ui-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function NewUser() {
    // form validation rules
    const validationSchema = Yup.object().shape({
        firstName: Yup.string()
            .required('First Name is required'),
        lastName: Yup.string()
            .required('Last name is required'),
        phone: Yup.string()
            .required('Phone is required'),
        Organisation: Yup.string()
            .required('Organisation is required'),
        role: Yup.string()
            .required('Role is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {register, handleSubmit, formState } = useForm(formOptions);
    const { errors } = formState;
    const [organisations, setOrganisations] = useState([]);
    const [roles, setRoles] = useState([]);
    const history = useHistory();

    const onSubmit = async data => {
        const result = await post(`users/create/${data.Organisation}/${data.role}`, data);
        if (result) {
            history.push('users');
        }
    };

    const loadOrganisations = useCallback(async () => {
        const organisationsResult = await getAll('organisations/get');
        setOrganisations(organisationsResult);
    },[]);

    const loadRoles = useCallback(async () => {
        const rolesResult = await getAll('roles/get');
        setRoles(rolesResult);
    });

    useEffect(() => {
        loadOrganisations();
        loadRoles();
    }, []);

    let orgRows = null;
    let rolesRows = null;
    if (organisations && organisations.length > 0) {
        orgRows = organisations.map((org, index) => (
            <option key={org.id} value={org.id}>{org.name}</option>
        ));
    }
    if (roles && roles.length > 0) {
        rolesRows = roles.map((role, index) => (
            <option key={role.id} value={role.id}>{role.name}</option>
        ));
    }

    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Create Account</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Form onSubmit={handleSubmit(onSubmit)}>
                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>First Name</label>
                                                <Input {...register("firstName")} type="text"  className={` ${errors.firstName ? 'is-invalid' : ''}`} />
                                                {errors.firstName && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Middle Name</label>
                                                <Input {...register("middleName")} type="text"  />
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Middle Name</label>
                                                <Input {...register("lastName")} type="text" className={` ${errors.lastName ? 'is-invalid' : ''}`} />
                                                {errors.lastName && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Organisation</label>
                                                <select {...register("Organisation")} className={` ${errors.Organisation ? 'is-invalid' : ''}`} >
                                                    <option value="">Select Organisation</option>
                                                    {orgRows}
                                                </select>
                                                {errors.Organisation && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Email Address</label>
                                                <Input {...register("email")} type="email" className={` ${errors.email ? 'is-invalid' : ''}`} />
                                                {errors.email && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Phone</label>
                                                <Input {...register("phone")} type="text" className={` ${errors.phone ? 'is-invalid' : ''}`} />
                                                {errors.phone && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Role</label>
                                                <select {...register("role")} className={` ${errors.Organisation ? 'is-invalid' : ''}`} >
                                                    <option value="">Select Role</option>
                                                    {rolesRows}
                                                </select>
                                                {errors.role && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Password</label>
                                                <Input {...register("password")} type="password" className={` ${errors.password ? 'is-invalid' : ''}`} />
                                                <div className="invalid-feedback">{errors.password?.message}</div>
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Confirm Password</label>
                                                <Input {...register("confirmPassword")} type="password" className={` ${errors.confirmPassword ? 'is-invalid' : ''}`} />
                                                <div className="invalid-feedback">{errors.confirmPassword?.message}</div>
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
