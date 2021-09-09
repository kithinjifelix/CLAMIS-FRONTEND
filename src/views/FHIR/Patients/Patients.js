import React, {useCallback, useEffect, useState} from "react";
import {Card, Col, Pagination, Row} from "react-bootstrap";
import makeData from "../../../data/tableData";
import {useGlobalFilter, usePagination, useTable} from "react-table";
import {GlobalFilter} from "../../tables/react-table/GlobalFilter";
import BTable from "react-bootstrap/Table";
import {useHistory} from "react-router-dom";
import {getAll} from "../../../services/Api";
import Swal from "sweetalert2";

function Table({ columns, data }) {
    const history = useHistory();

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page, // Instead of using 'rows', we'll use page,
        // which has only the rows for the active page

        globalFilter,
        setGlobalFilter,

        // The rest of these things are super handy, too ;)

        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable(
        {
            columns,
            data,
            initialState: { pageIndex: 0 },
        },
        useGlobalFilter,
        usePagination,
    );

    function onRowClicked(row) {
        history.push(`patients/${row.original.id}`);
    }

    return (
        <>
            <Row className='mb-3'>
                <Col className="d-flex align-items-center">
                    Show
                    <select
                        className='form-control w-auto mx-2'
                        value={pageSize}
                        onChange={e => {
                            setPageSize(Number(e.target.value))
                        }}
                    >
                        {[5, 10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                {pageSize}
                            </option>
                        ))}
                    </select>
                    entries
                </Col>
                <Col>
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                </Col>
            </Row>
            <BTable striped bordered hover responsive {...getTableProps()}>
                <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                {page.map((row, i) => {
                    prepareRow(row)
                    return (
                        <tr {...row.getRowProps()} onClick={() => onRowClicked(row)}>
                            {row.cells.map(cell => {
                                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                            })}
                        </tr>
                    )
                })}
                </tbody>
            </BTable>
            <Row className='justify-content-between mt-3'>
                <Col sm={12} md={6}>
            <span className="d-flex align-items-center">
                Page{' '} <strong> {pageIndex + 1} of {pageOptions.length} </strong>{' '}
                | Go to page:{' '}
                <input
                    type="number"
                    className='form-control ml-2'
                    defaultValue={pageIndex + 1}
                    onChange={e => {
                        const page = e.target.value ? Number(e.target.value) - 1 : 0
                        gotoPage(page)
                    }}
                    style={{ width: '100px' }}
                />
            </span>
                </Col>
                <Col sm={12} md={6}>
                    <Pagination className='justify-content-end'>
                        <Pagination.First onClick={() => gotoPage(0)} disabled={!canPreviousPage} />
                        <Pagination.Prev onClick={() => previousPage()} disabled={!canPreviousPage} />
                        <Pagination.Next onClick={() => nextPage()} disabled={!canNextPage} />
                        <Pagination.Last onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} />
                    </Pagination>
                </Col>
            </Row>
        </>
    );
}

export default function Patients() {
    const [patients, setPatients] = useState([]);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Patient',
                columns: [
                    {
                        Header: 'Patient ID',
                        accessor: 'patientId'
                    },
                    {
                        Header: 'Names',
                        accessor: 'names',
                    },
                    {
                        Header: 'Date Of Birth',
                        accessor: 'dob'
                    },
                    {
                        Header: 'Gender',
                        accessor: 'gender'
                    },
                    {
                        Header: 'Last Updated',
                        accessor: 'lastUpdated'
                    },
                    {
                        Header: 'Url',
                        accessor: 'url'
                    }
                ],
            },
        ], []
    );

    const loadPatients = useCallback(async () => {
        const patientsResult = await getAll('patients/get');
        if (patientsResult.status === 200) {
            setPatients(patientsResult.data);
        } else if (patientsResult.status === 400) {
            await Swal.fire('Oops...', patientsResult.data.message, 'error');
        }
    });

    useEffect(() => {
        loadPatients();
    }, []);

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">Patients</Card.Title>
                        </Card.Header>
                        <Card.Body>
                            <Table columns={columns} data={patients} />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </React.Fragment>
    );
}
