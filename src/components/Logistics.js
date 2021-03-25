import React, { Fragment } from 'react';
import _ from 'lodash';
import moment from 'moment';

const Logistics = ({ data, active}) => {
    return (
        <Fragment>
            <div className="container">
                <table className="table table-head" id="tableStyle">
                    <thead>
                        <tr>
                            <th scope="col">AWB NUMBER</th>
                            <th scope="col">TRANSPORTER</th>
                            <th scope="col">SOURCE</th>
                            <th scope="col">DESTINATION</th>
                            <th scope="col">START DATE</th>
                            <th scope="col">ETD</th>
                            <th scope="col">STATUS</th>

                        </tr>
                    </thead>
                    <tbody className="details">
                        {_.chain(data).filter(dataVariable => dataVariable.current_status_code === active).map((dataVariable, count) => (

                            <tr key={count} className={`filterRow ${dataVariable.awbno === rowActive ? 'selected' : ''}`} >
                                <td>{'#' + dataVariable.awbno}</td>
                                <td>{dataVariable.carrier}</td>
                                <td>{dataVariable.from}</td>
                                <td>{dataVariable.to}</td>
                                <td>{moment(dataVariable.pickup_date).format("MM/DD/YYYY")}</td>
                                <td>{moment(_.get(dataVariable, ['expected_delivery_date'])).format("MM/DD/YYYY")}</td>
                                <td>{dataVariable.current_status}</td>
                            </tr>
                        )).value()
                        }
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}

export default Logistics;