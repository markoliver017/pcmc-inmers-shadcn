"use client";

import { useState } from "react";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { FaWpforms } from "react-icons/fa";

export default function Home() {
    const [isAccepted, setIsAccepted] = useState(false);

    return (
        <div className="flex justify-center items-center">
            <div className="card bg-base-100 w-3/4 min-h-[30vh] shadow-lg border ">
                <div className="card-body">
                    <h2 className="card-title">Terms and Conditions</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <h2 className="card-title">Confidentiality.</h2>

                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolorem nisi consequatur voluptates odio, quod
                        porro? Obcaecati dolor magnam iste aspernatur nobis
                        maiores vel laudantium quas quo perferendis totam
                        distinctio aliquid quae nihil accusamus assumenda omnis
                        id saepe, consectetur sint nulla incidunt dolorum minus
                        quibusdam! Necessitatibus quo quae perspiciatis,
                        explicabo magnam repellendus itaque dolorem consequuntur
                        labore doloremque dolorum, nesciunt rerum aut.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Voluptatum quam sint alias odit explicabo temporibus
                        autem magni animi, optio illum laborum voluptates
                        nostrum itaque nihil quibusdam rerum, fugiat, modi
                        nobis?
                    </p>
                    <h2 className="card-title">Disclaimer</h2>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing
                        elit. Dolorem nisi consequatur voluptates odio, quod
                        porro? Obcaecati dolor magnam iste aspernatur nobis
                        maiores vel laudantium quas quo perferendis totam
                        distinctio aliquid quae nihil accusamus assumenda omnis
                        id saepe, consectetur sint nulla incidunt dolorum minus
                        quibusdam! Necessitatibus quo quae perspiciatis,
                        explicabo magnam repellendus itaque dolorem consequuntur
                        labore doloremque dolorum, nesciunt rerum aut.
                    </p>
                    <p className="mt-5">
                        <label className="label cursor-pointer text-gray-700 font-semibold">
                            <input
                                type="checkbox"
                                className="checkbox border-indigo-600 bg-orange-300 checked:bg-green-400 checked:text-green-800 checked:border-green-800"
                                checked={isAccepted}
                                onChange={(e) => {
                                    setIsAccepted(e.target.checked);
                                }}
                            />
                            I accept the terms and conditions
                        </label>
                    </p>
                    <div className="card-actions justify-center">
                        <button
                            disabled={!isAccepted}
                            className="btn btn-primary"
                        >
                            {isAccepted ? (
                                <>
                                    <FaWpforms /> Continue to Form
                                </>
                            ) : (
                                <>
                                    <HiMiniInformationCircle /> Please agree to
                                    the terms to continue.
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
