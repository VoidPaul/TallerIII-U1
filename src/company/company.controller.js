import ExcelJS from "exceljs"
import Company from "./company.model.js"
import { getSortOptions } from "../helpers/sorting.js"

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
      Company.find().sort(getSortOptions(req)).skip(Number(from)).limit(Number(limit)),
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
    const { id } = req.params
    const data = req.body

    if (data.foundationDate) {
      data.yearsActive = new Date().getFullYear() - new Date(data.foundationDate).getFullYear()
    }

    const company = await Company.findByIdAndUpdate(id, data, { new: true })

    return res.status(200).json({
      success: true,
      message: "Company data updated.",
      company,
    })
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating company.",
      error: err.message,
    })
  }
}

export const generateExcelReport = async (req, res) => {
  try {
    const companies = await Company.find().sort(getSortOptions(req))

    const companyFields = companies.map((company) => {
      const { id, ...companyData } = company.toJSON()
      return companyData
    })

    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet("Compañías.")

    worksheet.columns = [
      { header: "Nombre", key: "name", width: 25 },
      { header: "Dirección", key: "address", width: 50 },
      { header: "Correo", key: "email", width: 30 },
      { header: "Teléfono", key: "phone", width: 20 },
      { header: "Impacto", key: "impact", width: 10 },
      { header: "Fundación", key: "foundationDate", width: 10 },
      { header: "Trayectoria", key: "yearsActive", width: 5 },
      { header: "Categoría", key: "category", width: 20 },
    ]

    companyFields.forEach((company) => {
      worksheet.addRow(company)
    })

    const headerRow = worksheet.getRow(1)

    headerRow.font = { bold: true, color: { argb: "FFF2F2F7" }, size: 12 }
    headerRow.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF16161D" } }

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
    res.setHeader("Content-Disposition", "attachment; filename=Reporte-Compañías.xlsx")

    await workbook.xlsx.write(res)
    res.end()
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error generating Excel report.",
      error: err.message,
    })
  }
}
