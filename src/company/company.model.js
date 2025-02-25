import { Schema } from "mongoose"

const companySchema = Schema(
  {
    name: {},
    address: {},
    email: {},
    phone: {},
    fundationDate: {},
    category: {},
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
