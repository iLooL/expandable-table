import React, { useState } from 'react'

type Deployment = {
    branch: string;
    deployment_date: string;
    status: string;
    environment: string;
};

type Props = {
    deployments: Deployment[];
};

const DeploymentTable: React.FC<Props> = ({ deployments }) => {
    const [expandedRows, setExpandedRows] = useState<number[]>([]);
    const [selectedDeployment, setSelectedDeployment] = useState<Deployment | null>(null);
    const headers = [
        "Environment",
        "Branch",
        "Date",
        "Status",
        "Rollback",
        "Deploy"
    ]
    const handleRowClick = (index: number) => {
        const currentIndex = expandedRows.indexOf(index);
        const newExpandedRows = [...expandedRows];

        if (currentIndex === -1) {
            newExpandedRows.push(index);
            setSelectedDeployment(deployments[index]);
        } else {
            newExpandedRows.splice(currentIndex, 1);
            setSelectedDeployment(null);
        }

        setExpandedRows(newExpandedRows);
    };

    return (
        <div className="w-full h-full mx-auto">
            <div className="flex overflow-x-auto h-10 ">
                {
                    headers.map((item: any, index: number) => (
                        <>
                            { headers.length - index === 1 || headers.length - index === 2 ? 
                                <div key={index} className="bg-blue-500 px-3 py-4 w-1/6 flex justify-center">{item}</div>
                                :
                                <div key={index} className="bg-blue-500 px-3 py-4 w-1/6 flex justify-start">{item}</div>
                            }
                        </>
                    ))
                }
            </div>
            <div className="h-fit flex-col">
                {deployments.map((deployment, index) => (
                    <React.Fragment key={index}>
                        <div className="flex w-full justify-between h-15" onClick={() => handleRowClick(index)}>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.branch}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.deployment_date}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.status}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6'>{deployment.environment}</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
                            <div className='bg-slate-200 px-3 py-4 w-1/6 flex justify-center'>O</div>
                        </div>
                        {expandedRows.includes(index) && selectedDeployment && (
                            <div className="col-span-5 border-t border-gray-200 bg-slate-400 p-2 h-56">
                                <p>{`Branch: ${selectedDeployment.branch}`}</p>
                                <p>{`Deployment Date: ${selectedDeployment.deployment_date}`}</p>
                                <p>{`Status: ${selectedDeployment.status}`}</p>
                                <p>{`Environment: ${selectedDeployment.environment}`}</p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default DeploymentTable;
