import { Schema, model } from "mongoose"

const impactEnum = ["ALTO", "MEDIO", "BAJO"]

const companySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Company name required."],
    },
    address: {
      type: String,
      required: [true, "Company address required."],
    },
    email: {
      type: String,
      required: [true, "Company e-mail required."],
    },
    phone: {
      type: String,
      minLength: 8,
      maxLnegth: 10,
      required: [true, "Company phone required."],
    },
    impact: {
      type: String,
      required: [true, "Company impact required."],
      enum: impactEnum,
    },
    foundationDate: {
      type: Date,
      required: [true, "Company fundation date required."],
    },
    yearsInProduction: {
      type: Number,
      required: [true, "Company trajectory required."],
    },
    category: {
      type: String,
      required: [true, "Company business category required."],
    },
  },
  {
    versionKey: false,
    timeStamps: true,
  }
)

companySchema.methods.toJSON = function () {
  const { name, _id, ...company } = this.toObject()
  company.id = _id
  return company
}

export default model("Company", companySchema)
