import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {getAll, post, put} from "../../services/Api";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Dropdown, Form, Input} from "semantic-ui-react";
import React, {useCallback, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";

export default function NewRole() {
    const { register, handleSubmit, formState: {errors} } = useForm();
    const [role, setRole] = useState('');
    const [permission, setPermission] = useState([]);
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
        if (result.status === 200) {
            await Swal.fire('Success', 'Successfully registered role', 'success');
            history.push('/registration/roles');
        } else if (result.status === 400) {
            await Swal.fire('Oops...', result.data.message, 'error');
        }
    };

    const setRoleName = (e) => {
        setRole(e.target.value)
    }

    const onPermissionChange = (e) => {
        console.log(e.target.value);
        setPermission(e.target.value);
        console.log(permission);
    }

    const options = [
        { key: 'angular', text: 'Angular', value: 'angular' },
        { key: 'css', text: 'CSS', value: 'css' },
        { key: 'design', text: 'Graphic Design', value: 'design' },
        { key: 'ember', text: 'Ember', value: 'ember' },
        { key: 'html', text: 'HTML', value: 'html' },
        { key: 'ia', text: 'Information Architecture', value: 'ia' },
        { key: 'javascript', text: 'Javascript', value: 'javascript' },
        { key: 'mech', text: 'Mechanical Engineering', value: 'mech' },
        { key: 'meteor', text: 'Meteor', value: 'meteor' },
        { key: 'node', text: 'NodeJS', value: 'node' },
        { key: 'plumbing', text: 'Plumbing', value: 'plumbing' },
        { key: 'python', text: 'Python', value: 'python' },
        { key: 'rails', text: 'Rails', value: 'rails' },
        { key: 'react', text: 'React', value: 'react' },
        { key: 'repair', text: 'Kitchen Repair', value: 'repair' },
        { key: 'ruby', text: 'Ruby', value: 'ruby' },
        { key: 'ui', text: 'UI Design', value: 'ui' },
        { key: 'ux', text: 'User Experience', value: 'ux' },
    ];

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
                                    <Col md={4}>
                                        <Form.Group widths='equal'>
                                            <Form.Field>
                                                <label>Permissions</label>
                                                <Dropdown {...register("permissions", { required: true })} value={permission} onChange={(e, data) => {
                                                    setPermission(data.value);
                                                    console.log(permission);
                                                }} placeholder='Available Permissions' fluid multiple selection options={options} />
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
