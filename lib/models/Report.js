const ReportModel = (sequelize, DataTypes) => {
    const Report = sequelize.define(
        "Report",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            report_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Report Date is required.",
                    },
                    isDate: {
                        msg: "Report Date must be a valid date.",
                    },
                },
            },
            error_date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Medication Error Date field is required.",
                    },
                    isDate: {
                        msg: "Medication Error Date field must be a valid date.",
                    },
                },
            },
            patient_sex: {
                type: DataTypes.ENUM("Male", "Female"),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [["Male", "Female"]],
                        msg: "Patient Sex must be either Male or Female.",
                    },
                    notEmpty: {
                        msg: "Patient Sex is required.",
                    },
                },
            },
            patient_weight: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        msg: "Patient Weight must be a decimal value.",
                    },
                    min: {
                        args: [0],
                        msg: "Patient Weight must be a positive value.",
                    },
                    notEmpty: {
                        msg: "Patient Weight is required.",
                    },
                },
            },
            patient_height: {
                type: DataTypes.DECIMAL(5, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        msg: "Patient Height must be a decimal value.",
                    },
                    min: {
                        args: [0],
                        msg: "Patient Height must be a positive value.",
                    },
                    notEmpty: {
                        msg: "Patient Height is required.",
                    },
                },
            },
            exact_prescription: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Exact Prescription is required.",
                    },
                },
            },
            error_type: {
                type: DataTypes.ENUM(
                    "Incorrect prescription (medication order)",
                    "Incorrect transcription on patient chart / record",
                    "Incorrect Dispensing",
                    "Incorrect Preparation – Compounding errors",
                    "Incorrect Administration – Wrong patient",
                    "Incorrect Administration – Wrong medication",
                    "Incorrect Administration – Wrong dose/ dosage",
                    "Incorrect Administration – Wrong time",
                    "Incorrect Administration – Wrong route",
                    "Incorrect Administration – Wrong form of medication",
                    "Incorrect Administration – Omission (medication is not given)",
                    "Others"
                ),
                allowNull: false,
                validate: {
                    isIn: {
                        args: [
                            [
                                "Incorrect prescription (medication order)",
                                "Incorrect transcription on patient chart / record",
                                "Incorrect Dispensing",
                                "Incorrect Preparation – Compounding errors",
                                "Incorrect Administration – Wrong patient",
                                "Incorrect Administration – Wrong medication",
                                "Incorrect Administration – Wrong dose/ dosage",
                                "Incorrect Administration – Wrong time",
                                "Incorrect Administration – Wrong route",
                                "Incorrect Administration – Wrong form of medication",
                                "Incorrect Administration – Omission (medication is not given)",
                                "Others",
                            ],
                        ],
                        msg: "Invalid Medication Error Type.",
                    },
                    notEmpty: {
                        msg: "Medication error type is required.",
                    },
                },
            },
            other_error_type: {
                type: DataTypes.TEXT,
                validate: {
                    // This field can be null if error_type is not "Others"
                    isOptional: true,
                    isRequiredIfOthers(value) {
                        if (this.error_type === "Others" && !value) {
                            throw new Error(
                                "Please specify the type of error when selecting 'Others' as the error type."
                            );
                        }
                    },
                },
            },
            incident_description: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the medication error incident is required.",
                    },
                },
            },
            workplace_environment: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the workplace environment is required.",
                    },
                },
            },
            patient_condition: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the patient condition is required.",
                    },
                },
            },
            immediate_actions: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the immediate action/s done is required.",
                    },
                },
            },
            corrective_actions: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the corrective action/s done is required.",
                    },
                },
            },
            preventive_actions: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Description of the preventive action/s done is required.",
                    },
                },
            },
            is_verified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                validate: {
                    isVerified(value) {
                        if (!value || value == 0 || value == false) {
                            throw new Error(
                                "Please review and verify the details of the medication error incident."
                            );
                        }
                    },
                },
            },
        },
        { timestamps: true, tableName: "reports" }
    );

    /* Define associations in the `associate` method
     ** your associations here .. sample codes below
     */
    return Report;
};

export default ReportModel;
