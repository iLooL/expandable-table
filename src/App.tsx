import DeploymentTable from './components/DeploymentTable'
import { table as deployments }  from './table.ts'

function App() {
 

  return (
    <div className="w-11/12 mx-auto bg-red-300">
      <DeploymentTable deployments={deployments} />
    </div>
  )
}

export default App
