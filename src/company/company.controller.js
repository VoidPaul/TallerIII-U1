import Company from "./company.model.js"

export const addCompany = async (req, res) => {
  try {
    const data = req.body

    data.yearsActive = new Date().getFullYear() - new Date(data.foundationDate).getFullYear()

    const company = new Company(data)

    await company.save()

    return res.status(201).json({
      success: true,
      message: "Company added.",
      company,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error adding company.",
      error: err.message,
    })
  }
}

export const getCompanyById = async (req, res) => {
  try {
    const { id } = req.params

    const company = await Company.findById(id)

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      })
    }

    return res.status(200).json({
      success: true,
      company,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error getting company.",
      error: err.message,
    })
  }
}

export const getCompanies = async (req, res) => {
  try {
    const { limit = 5, from = 0 } = req.query

    const [total, companies] = await Promise.all([
      Company.countDocuments(),
      Company.find().skip(Number(from)).limit(Number(limit)),
    ])

    return res.status(200).json({
      success: true,
      total,
      companies,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error listing companies.",
      error: err.message,
    })
  }
}

export const updateCompany = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error listing companies.",
      error: err.message,
    })
  }
}
