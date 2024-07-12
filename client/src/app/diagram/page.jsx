import Link from "next/link";

const ApiManager = () => {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Process Name</th>
              <th>Last Update</th>
              <th>Description</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>1</th>
              <td>Process A</td>
              <td>2023-07-11</td>
              <td>Initial data processing</td>
              <td>
                <Link href="/detail">
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <th>2</th>
              <td>Process B</td>
              <td>2023-07-12</td>
              <td>Data cleaning</td>
              <td>
                <Link href="/detail">
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <th>3</th>
              <td>Process C</td>
              <td>2023-07-13</td>
              <td>Data transformation</td>
              <td>
                <Link href="/detail">
                  <button className="btn btn-primary">View</button>
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApiManager;
