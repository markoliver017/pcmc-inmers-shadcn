import { Card } from '@components/ui/card';
import SweetAlert from '@components/ui/SweetAlert';
import clsx from 'clsx';
import React from 'react'
import { FaWpforms } from 'react-icons/fa';
import { HiMiniInformationCircle } from 'react-icons/hi2';

export default function Terms({
    isAccepted,
    setIsAccepted,
    setIsProceedForm,
}) {
    return (
        <Card className="w-3/4 min-h-[30vh]">
            <div className="card-body">
                <h2 className="card-title">Terms and Conditions</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit.
                </p>
                <h2 className="card-title">Confidentiality.</h2>

                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Dolorem nisi consequatur voluptates odio, quod
                    porro? Obcaecati dolor magnam iste aspernatur nobis
                    maiores vel laudantium quas quo perferendis totam
                    distinctio aliquid quae nihil accusamus assumenda
                    omnis id saepe, consectetur sint nulla incidunt
                    dolorum minus quibusdam! Necessitatibus quo quae
                    perspiciatis, explicabo magnam repellendus itaque
                    dolorem consequuntur labore doloremque dolorum,
                    nesciunt rerum aut.
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit. Voluptatum quam sint alias odit explicabo
                    temporibus autem magni animi, optio illum laborum
                    voluptates nostrum itaque nihil quibusdam rerum,
                    fugiat, modi nobis?
                </p>
                <h2 className="card-title">Disclaimer</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing
                    elit.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit. Dolorem nisi consequatur voluptates odio, quod
                    porro? Obcaecati dolor magnam iste aspernatur nobis
                    maiores vel laudantium quas quo perferendis totam
                    distinctio aliquid quae nihil accusamus assumenda
                    omnis id saepe, consectetur sint nulla incidunt
                    dolorum minus quibusdam! Necessitatibus quo quae
                    perspiciatis, explicabo magnam repellendus itaque
                    dolorem consequuntur labore doloremque dolorum,
                    nesciunt rerum aut.
                </p>
                <p className="mt-5">
                    <label className="label cursor-pointer font-semibold">
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
                        aria-disabled={!isAccepted}
                        className={clsx(
                            "btn",
                            isAccepted ? "btn-primary" : "btn-gray text-gray-500 cursor-not-allowed"
                        )}
                        // className="btn btn-gray text-gray-500 hover:cursor-not-allowed"
                        onClick={() => {
                            if (!isAccepted) {
                                SweetAlert({
                                    title: "Terms and Conditions",
                                    text: "Please accept the terms and conditions to proceed.",
                                    icon: "warning"
                                })
                                return;
                            }
                            setIsProceedForm(true);
                        }}
                    >
                        {isAccepted ? (
                            <>
                                <FaWpforms /> Continue to Form
                            </>
                        ) : (
                            <>
                                <HiMiniInformationCircle /> Please agree
                                to the terms to continue.
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Card>
    )
}
