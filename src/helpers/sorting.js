const allowedParams = ["name", "yearsActive", "impact", "category"]

export const getSortOptions = (req) => {
  if (!req.query.sort || !allowedParams.includes(req.query.sort)) {
    return { _id: 1 };  // Default to _id ascending
  }
  const sortField = req.query.sort;
  const sortOrder = req.query.order === "desc" ? -1 : 1;
  return { [sortField]: sortOrder };
}