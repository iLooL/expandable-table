import React, { useState } from 'react'

type Deployment = {
  branch: string;
  deployment_date: string;
  status: string;
  environment: string;
  commit_hash: string;
  deployed_by: string;
  deployment_duration: string;
  rollback_status: string;
  error_logs: string;
  test_results: string;
  deployment_notes: string;
};

type Props = {
    deployments: Deployment[];
};

const DeploymentTable: React.FC<Props> = ({ deployments }) => {
  // key is index of row, T/F for if it's selected
    const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
    const headers = [
        "Environment",
        "Branch",
        "Date",
        "Status",
        "Rollback",
        "Deploy"
    ]
    const handleRowClick = (index: number) => {
        setExpandedRows(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    console.log(expandedRows)

    return (
        <div className="w-full h-full mx-auto">
            <div className="flex overflow-x-auto">
                {
                    headers.map((item: any, index: number) => (
                        <React.Fragment key={index}>
                            { headers.length - index === 1 || headers.length - index === 2 ? 
                                <div key={index} className="bg-gray-800 text-white px-3 py-4 w-1/6 flex justify-center">{item}</div>
                                :
                                <div key={index} className="bg-gray-800 text-white px-3 py-4 w-1/6 flex justify-start">{item}</div>
                            }
                        </React.Fragment>
                    ))
                }
            </div>
            <div className="h-fit flex-col">
                {deployments.map((deployment, index) => (
                    <React.Fragment key={index}>
                        <div className="flex w-full justify-between border-b-2 border-sky-500 hover:border-sky-700" onClick={() => handleRowClick(index)}>
                            <div className='px-3 py-4 w-1/6'>{deployment.branch}</div>
                            <div className='px-3 py-4 w-1/6'>{deployment.deployment_date}</div>
                            <div className='px-3 py-4 w-1/6'>{deployment.status}</div>
                            <div className='px-3 py-4 w-1/6'>{deployment.environment}</div>
                            <div className='px-3 py-4 w-1/6 flex justify-center'>O</div>
                            <div className='px-3 py-4 w-1/6 flex justify-center'>O</div>
                        </div>
                        {expandedRows[index] && (
                            <div className="from-blackcol-span-5 mt-3 border border-gray-200 p-4 rounded-2xl">
                                <p>{`Branch: ${deployment.branch}`}</p>
                                <p>{`Deployment Date: ${deployment.deployment_date}`}</p>
                                <p>{`Status: ${deployment.status}`}</p>
                                <p>{`Environment: ${deployment.commit_hash}`}</p>
                                <p>{`Environment: ${deployment.deployed_by}`}</p>
                                <p>{`Environment: ${deployment.deployment_duration}`}</p>
                                <p>{`Environment: ${deployment.rollback_status}`}</p>
                                <p>{`Environment: ${deployment.error_logs}`}</p>
                                <p>{`Environment: ${deployment.test_results}`}</p>
                                <p>{`Environment: ${deployment.deployment_notes}`}</p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DeploymentTable;
