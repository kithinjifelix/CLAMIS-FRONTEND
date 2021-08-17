import React, {useCallback, useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {getAll, post, put} from "../../services/Api";
import { useHistory, useParams } from "react-router-dom";
import {Form, Input} from 'semantic-ui-react';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function NewUser() {
    const params = useParams();
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
        password: params && params.id ? Yup.string() : Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
        confirmPassword: params && params.id ? Yup.string() : Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    const {register, setValue, handleSubmit, formState: {errors} } = useForm(formOptions);
    const [organisations, setOrganisations] = useState([]);
    const [roles, setRoles] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddle] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [Organisation, setOrganisation] = useState("");
    const [role, setRole] = useState("");
    const history = useHistory();

    const onSubmit = async data => {
        data.username = data.email;
        let result = null;
        if (params && params.id) {
            result = await put(`users/put/${params.id}/${data.Organisation}/${data.role}`, data);
        } else {
            result = await post(`users/create/${data.Organisation}/${data.role}`, data);
        }
        if (result) {
            history.push('/registration/users');
        }
    };

    const loadOrganisations = useCallback(async () => {
        const organisationsResult = await getAll('organisations/get');
        setOrganisations(organisationsResult);
    },[]);

    const loadRoles = useCallback(async () => {
        const rolesResult = await getAll('roles/get');
        setRoles(rolesResult);
    }, []);

    const loadUser = useCallback(async () => {
        if (params && params.id) {
            const userRes = await getAll(`users/get/${params.id}`);
            if (userRes) {
                setFirstName(userRes.firstName);
                setValue('firstName', userRes.firstName);
                setMiddle(userRes.middleName);
                setValue('middleName', userRes.middleName);
                setLastName(userRes.lastName);
                setValue('lastName', userRes.lastName);
                setEmail(userRes.email);
                setValue('email', userRes.email);
                setPhone(userRes.phone);
                setValue('phone', userRes.phone);
                if (userRes.roles && userRes.roles.length > 0) {
                    setRole(userRes.roles[0].id);
                    setValue('role', userRes.roles[0].id);
                }
                if (userRes.organisation) {
                    setOrganisation(userRes.organisation.id);
                    setValue("Organisation", userRes.organisation.id);
                }
            }
        }
    }, []);

    useEffect(() => {
        loadOrganisations();
        loadRoles();
        loadUser();
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

    const setUserFirstName = (e) => {
        setFirstName(e.target.value);
        setValue('firstName', e.target.value);
    }

    const setUserMiddleName = (e) => {
        setMiddle(e.target.value);
        setValue('middleName', e.target.value);
    }

    const setUserLastName = (e) => {
        setLastName(e.target.value);
        setValue('lastName', e.target.value);
    }

    const setUserOrganisation = (e) => {
        setOrganisation(e.target.value);
        setValue('Organisation', e.target.value);
    }

    const setUserEmail = (e) => {
        setEmail(e.target.value);
        setValue('email', e.target.value);
    }

    const setUserPhone = (e) => {
        setPhone(e.target.value);
        setValue('phone', e.target.value);
    }
    const setUserRole = (e) => {
        setRole(e.target.value);
        setValue('role', e.target.value);
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
                                                <Input {...register("firstName")} type="text"  value={firstName} onChange={setUserFirstName} className={` ${errors.firstName ? 'is-invalid' : ''}`} />
                                                {errors.firstName && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Middle Name</label>
                                                <Input {...register("middleName")} value={middleName || ""} onChange={setUserMiddleName} type="text"  />
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Middle Name</label>
                                                <Input {...register("lastName")} type="text" value={lastName} onChange={setUserLastName} className={` ${errors.lastName ? 'is-invalid' : ''}`} />
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
                                                <select {...register("Organisation")} value={Organisation || ""} onChange={setUserOrganisation} className={` ${errors.Organisation ? 'is-invalid' : ''}`} >
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
                                                <Input {...register("email")} type="email" value={email} onChange={setUserEmail} className={` ${errors.email ? 'is-invalid' : ''}`} />
                                                {errors.email && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Phone</label>
                                                <Input {...register("phone")} type="text" value={phone} onChange={setUserPhone} className={` ${errors.phone ? 'is-invalid' : ''}`} />
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
                                                <select {...register("role")} value={role || ""} onChange={setUserRole} className={` ${errors.Organisation ? 'is-invalid' : ''}`} >
                                                    <option value="">Select Role</option>
                                                    {rolesRows}
                                                </select>
                                                {errors.role && <span className="text-danger">This field is required</span>}
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4} className={ params.id ? 'hidden' : undefined }>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Password</label>
                                                <Input {...register("password")} type="password" className={` ${errors.password ? 'is-invalid' : ''}`} />
                                                <div className="invalid-feedback">{errors.password?.message}</div>
                                            </Form.Field>
                                        </Form.Group>
                                    </Col>

                                    <Col md={4} className={ params.id ? 'hidden' : undefined }>
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
