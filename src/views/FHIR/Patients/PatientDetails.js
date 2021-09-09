import React, {useCallback, useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";
import {useParams} from "react-router-dom";
import {getAll} from "../../../services/Api";
import Swal from "sweetalert2";
import { FhirResource, fhirVersions } from 'fhir-react';
import resource from "./resource";

export default function PatientDetails() {
    const [patient, setPatient] = useState();
    const params = useParams();

    const loadPatient = useCallback(async () => {
        if (params && params.patientId) {
            const patientResult = await getAll(`patients/get/${params.patientId}`);
            if (patientResult.status === 200) {
                setPatient(patientResult.data);
            } else if (patientResult.status === 400) {
                await Swal.fire('Oops...', patientResult.data.message, 'error');
            }
        }
    }, []);

    useEffect(() => {
        loadPatient();
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Patient Details</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    Name: {patient ? patient.names : null }
                                </Col>
                                <Col>
                                    Date Of Birth: { patient ? patient.dob : null }
                                </Col>
                                <Col>
                                    Gender: { patient ? patient.gender : null }
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <FhirResource
                                        fhirResource={resource}
                                        fhirVersion={fhirVersions.R4}
                                        withCarinBBProfile
                                    />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
