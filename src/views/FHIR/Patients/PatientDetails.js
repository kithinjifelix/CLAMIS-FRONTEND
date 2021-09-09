import React, {useCallback, useEffect, useState} from "react";
import {Card, Col, Row} from "react-bootstrap";

export default function PatientDetails() {
    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Patient Details</Card.Title>
                        </Card.Header>
                        <Card.Body>

                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
