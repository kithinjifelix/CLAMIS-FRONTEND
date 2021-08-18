import {useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {getAll, post, put} from "../../services/Api";
import Aux from "../../hoc/_Aux";
import {Button, Card, Col, Row} from "react-bootstrap";
import {Form, Input} from "semantic-ui-react";
import React, {useCallback, useEffect, useState} from "react";
import { useParams } from 'react-router-dom';
import Swal from "sweetalert2";
import DualListBox from 'react-dual-listbox';

export default function NewRole() {
    const { register, setValue, handleSubmit, formState: {errors} } = useForm();
    const [role, setRole] = useState('');
    const [selected, setSelected] = useState([]);
    const [permissions, setPermissions] = useState([]);
    const history = useHistory();
    const params = useParams();

    const loadRole = useCallback(async () => {
        if (params && params.id) {
            const roleResult = await getAll(`roles/get/${params.id}`);
            if (roleResult.status === 200) {
                setRole(roleResult.data.name);
                setValue("name", roleResult.data.name);
                const permissions = [];
                roleResult.data.permissions.map(obj => {
                    permissions.push(obj.id);
                });
                setSelected(permissions);
            } else if (roleResult.status === 400) {
                await Swal.fire('Oops...', roleResult.data.message, 'error');
            }
        }
    });

    const loadPermissions = useCallback(async () => {
        const result = await getAll(`permissions/get`);
        if (result.status === 200) {
            setPermissions(result.data);
        } else if (result.status === 400) {
            await Swal.fire('Oops...', result.data.message, 'error');
        }
    });

    useEffect(() => {
        loadRole();
        loadPermissions();
    },[]);

    const onSubmit = async (data) => {
        const InData = { name: data.name, rolePermissions: selected };
        let result;
        if (params && params.id) {
            result = await put(`roles/put/${params.id}`, InData);
        } else {
            result = await post('roles/create', InData);
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

    const onChange = (selected) => {
        setSelected(selected);
    }

    const options = [];
    permissions.map(permission => {
        options.push({ value: permission.id, label: permission.name });
    });

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
                                                <DualListBox options={options} selected={selected} onChange={e => onChange(e)} />
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
