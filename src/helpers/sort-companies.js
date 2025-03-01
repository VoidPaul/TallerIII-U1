const allowedParams = ["name", "yearsActive", "impact", "category"]

export const getSortOptions = (req) => {
  if (
    !req.query.sort ||
    !allowedParams.includes(req.query.sort) ||
    !req.query.order ||
    !["asc", "desc"].includes(req.query.order)
  ) {
    return { _id: 1 }
  }
  const sortField = req.query.sort
  const sortOrder = req.query.order === "desc" ? -1 : 1;
  return { [sortField]: sortOrder };
}