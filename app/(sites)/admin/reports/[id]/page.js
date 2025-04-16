import { redirect } from "next/navigation";
import parse from "html-react-parser";
import Link from "next/link";

export default async function Page({ params }) {
    const { id } = await params;
    const url = new URL(`/api/reports/${id}`, "http://localhost:3000");
    const response = await fetch(url, {
        method: "GET",
        cache: "no-store",
    });
    const { report } = await response.json();
    if (!report) redirect("/admin/reports");

    const error_type =
        report.error_type.name == "Others"
            ? `${report.error_type.name} <i>(${report.other_error_type})</i>`
            : report.error_type.name;

    return (
        <div className="overflow-x-auto">
            <Link className="btn btn-neutral" href="/admin/reports">
                Back
            </Link>
            <div className="card shadow-md mt-2">
                <div className="card-body overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Fields</th>
                                <th>Inputs</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray-200 border-b border-gray-300">
                                <th colSpan={2}>Patient Details</th>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Sex</th>
                                <td>{report.patient_sex.toUpperCase()}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Height</th>
                                <td>{report.patient_height} cm</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Weight</th>
                                <td>{report.patient_weight} kg</td>
                            </tr>
                            <tr className="bg-gray-200 border-b border-gray-300">
                                <th colSpan={2}>Medication Error Details</th>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Reported Date</th>
                                <td>{report.report_date}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Medication Error Date</th>
                                <td>{report.error_date}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Error Type</th>
                                <td>{parse(error_type)}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Exact Prescription</th>
                                <td>{report.exact_prescription}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Incident Description</th>
                                <td>{report.incident_description}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Workplace Environment</th>
                                <td>{report.workplace_environment}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Patient Condition</th>
                                <td>{report.patient_condition}</td>
                            </tr>

                            <tr className="hover:bg-base-300">
                                <th>Immediate Actions</th>
                                <td>{report.immediate_actions}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Corrective Actions</th>
                                <td>{report.corrective_actions}</td>
                            </tr>
                            <tr className="hover:bg-base-300">
                                <th>Preventive Actions</th>
                                <td>{report.preventive_actions}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
