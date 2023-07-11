import DeploymentTable from './components/DeploymentTable'
import { table as deployments }  from './table.ts'

function App() {
 

  return (
    <div className="flex w-max h-max">
      <DeploymentTable deployments={deployments} />
    </div>
  )
}

export default App
