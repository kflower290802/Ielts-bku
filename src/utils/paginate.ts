export function paginateData<T>(data: T[], page = 1, limit = 10) {
  // Tính toán vị trí bắt đầu và kết thúc của dữ liệu cần lấy
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  // Cắt dữ liệu theo trang
  const paginatedData = data.slice(startIndex, endIndex);

  // Tổng số trang
  const totalPages = Math.ceil(data.length / limit);

  return {
    data: paginatedData,
    page: page,
    limit: limit,
    total: data.length,
    pages: totalPages,
  };
}
