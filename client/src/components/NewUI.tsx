export default function NewUI() {
    return (
        <>
            <div className="container h-100 text-white">
                <div className="row d-flex align-items-center h-100">
                    <div className="col-md-6">
                        <h1 className="mb-4 opacity-90">Check your trips and lifts</h1>
                        <h5 className="mb-4 opacity-80">Choose the game</h5>
                        <p className="mb-4 opacity-70 align-content-around">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sapiente illum distinctio fugit
                            consectetur quae deleniti corrupti provident vel porro, dolore molestias nihil iusto quidem
                            dolorem at amet voluptates esse pariatur.</p>

                        <a href="#" className="btn btn-light btn-lg me-3 opacity-80 ripple" role="button"><i className="fa-solid fa-road"></i> Request trip</a>
                        <a href="#" className="btn btn-outline-light btn-lg me-3 opacity-80">Share a spot <i className="fa-solid fa-car-side"></i></a>
                    </div>
                    <div className="col-md-5 offset-md-1 position-relative justify-content-center">
                        <div id="shape-1" className="position-absolute strong-5-strong"></div>
                        <div id="shape-2" className="position-absolute strong-5-strong"></div>
                        <div id="card-custom" className="card-group shadow-6 rounded-6">
                            <div className="card-body p-5 opacity-90 align-items-center">
                                <h2>
                                    <strong className="fw-bolder">View</strong>
                                    <span className="fw-lighter">next trip</span>
                                    <img src="./img/86home.jpg" className="card-img-top" alt="..."> </img>
                                </h2>

                                <div className="">
                                    <p className="card-text mb-2 badge bg-primary">Joe Doe - Premium user</p>
                                    <p className="mb-5 badge bg-light text-dark">Date: 12/12/22</p>
                                    <h6 className="card-text mb-2 badge bg-success">Match: Barça x Real Madrid</h6>
                                </div>

                            </div>
                            <div className="card-footer border-0 px-5 opacity-90 lh-sm fw-light flex-lg-fill">
                                <i className="fa-regular fa-futbol mb-5"></i>
                                <h5 className="mb-5"> Trip to Montevideo</h5>
                            </div>
                        </div>
                    </div>
                    <div className="container h-100">
                        <table className="table text-white">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Jacob</td>
                                    <td>Thornton</td>
                                    <td>@fat</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td >Larry the Bird</td>
                                    <td>@twitter</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}