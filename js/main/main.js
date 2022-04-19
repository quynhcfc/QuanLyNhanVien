let danhSachNhanVienArr = [];

// localStorage
var nhanVienLocal = "nhanVienLocal";
let json = localStorage.getItem(nhanVienLocal);

if (json !== null) {
  danhSachNhanVienArr = JSON.parse(json);
  renderDanhSachNhanVien(danhSachNhanVienArr);
}

// Span Thông Báo
let spanThongBao = () => {
  let spThongBao = document.querySelectorAll(".sp-thongbao");
  for (let i = 0; i < spThongBao.length; i++) {
    spThongBao[i].style.display = "block";
  }
};

// Disable button
document.getElementById("btnThem").addEventListener("click", () => {
  document.getElementById("tknv").disabled = false;
  document.getElementById("password").disabled = false;
  document.getElementById("btnThemNV").style.display = "block";
  document.getElementById("btnCapNhat").style.display = "none";

  document.getElementById("header-title").innerText = "Thêm nhân viên mới";
});

// Thêm nhân viên
themNhanVien = () => {
  var newNV = layThongTinForm();

  var isValid = true;

  var isValid =
    validatorNV.kiemTraRong(
      newNV.taiKhoan,
      "tbTKNV",
      "Tài khoản không được trống"
    ) &
    validatorNV.kiemTraRong(newNV.ten, "tbTen", "Tên không được trống") &
    validatorNV.kiemTraRong(newNV.email, "tbEmail", "Email không được trống") &
    validatorNV.kiemTraRong(
      newNV.matKhau,
      "tbMatKhau",
      "Mật khẩu không được trống"
    ) &
    validatorNV.kiemTraRong(newNV.ngayLam, "tbNgay", "Chưa chọn ngày làm") &
    validatorNV.kiemTraRong(
      newNV.luong,
      "tbLuongCB",
      "Lương không được trống"
    ) &
    validatorNV.kiemTraRong(newNV.chucVu, "tbChucVu", "Chưa chọn chức vụ") &
    validatorNV.kiemTraRong(
      newNV.gioLam,
      "tbGiolam",
      "Giờ làm không được trống"
    );

  isValid =
    isValid &&
    validatorNV.kiemTraTrungTaiKhoan(newNV.taiKhoan, danhSachNhanVienArr) &&
    validatorNV.kiemTraTaiKhoan(newNV.taiKhoan, "tbTKNV") &&
    validatorNV.kiemTraTen(newNV.ten, "tbTen") &&
    validatorNV.kiemTraEmail(newNV.email, "tbEmail") &&
    validatorNV.kiemTraPassword(newNV.matKhau, "tbMatKhau") &&
    validatorNV.kiemTraLuong(newNV.luong, "tbLuongCB") &&
    validatorNV.kiemTraGioLam(newNV.gioLam, "tbGiolam");

  spanThongBao();

  if (isValid) {
    danhSachNhanVienArr.push(newNV);

    setLocalNV(danhSachNhanVienArr);
    renderDanhSachNhanVien(danhSachNhanVienArr);

    document.getElementById("formNV").reset();
  }
};

// Vị trí tài khoản
var kiemTraTK = (taiKhoan) => {
  return danhSachNhanVienArr.findIndex((nv) => {
    return nv.taiKhoan == taiKhoan;
  });
};

//  Xóa nhân viên
xoaNhanVien = (taiKhoan) => {
  var index = kiemTraTK(taiKhoan);

  if (index !== -1) {
    danhSachNhanVienArr.splice(index, 1);

    setLocalNV(danhSachNhanVienArr);
    renderDanhSachNhanVien(danhSachNhanVienArr);
  }
};

// Sửa nhân viên
suaNhanVien = (taiKhoan) => {
  var index = kiemTraTK(taiKhoan);

  if (index !== -1) {
    var nv = danhSachNhanVienArr[index];
  }

  document.getElementById("tknv").value = nv.taiKhoan;
  document.getElementById("name").value = nv.ten;
  document.getElementById("email").value = nv.email;
  document.getElementById("password").value = nv.matKhau;
  document.getElementById("datepicker").value = nv.ngayLam;
  document.getElementById("luongCB").value = nv.luong;
  document.getElementById("chucvu").value = nv.chucVu;
  document.getElementById("gioLam").value = nv.gioLam;

  document.getElementById("tknv").disabled = true;
  document.getElementById("password").disabled = true;
  document.getElementById("btnThemNV").style.display = "none";
  document.getElementById("btnCapNhat").style.display = "block";
  document.getElementById("header-title").innerText = "Cập nhật nhân viên";
};

// Cập nhật nhân viên
capNhatNhanVien = (taiKhoan) => {
  var taiKhoan = document.getElementById("tknv").value;
  let index = kiemTraTK(taiKhoan);
  let updateNV = layThongTinForm();

  spanThongBao();

  var isValidUpdate = true;

  isValidUpdate =
    isValidUpdate &&
    validatorNV.kiemTraTen(updateNV.ten, "tbTen") &&
    validatorNV.kiemTraEmail(updateNV.email, "tbEmail") &&
    validatorNV.kiemTraLuong(updateNV.luong, "tbLuongCB") &&
    validatorNV.kiemTraGioLam(updateNV.gioLam, "tbGiolam");

  if (isValidUpdate) {
    if (index !== -1) {
      let nv = layThongTinForm();

      danhSachNhanVienArr[index] = nv;

      setLocalNV(danhSachNhanVienArr);
      renderDanhSachNhanVien(danhSachNhanVienArr);

      document.getElementById("tknv").disabled = false;
      document.getElementById("password").disabled = false;

      document.getElementById("formNV").reset();
    }
  }

  if (updateNV.taiKhoan == "") {
    $("#btnCapNhat").attr("data-dismiss", "modal");
  }
};

// Tìm kiếm nhân viên theo loại nhân viên
document.getElementById("searchName").addEventListener("keyup", () => {
  var keyword = document.getElementById("searchName").value.toLowerCase();

  var danhSachTimKiem = danhSachNhanVienArr.filter((nv) => {
    return nv.xepLoai.toLowerCase().includes(keyword);
  });

  renderDanhSachNhanVien(danhSachTimKiem);
});

// Sắp xếp tài khoản
/*
sapXepTaiKhoan = () => {
  var newDanhSachNV = danhSachNhanVienArr.map((nhanvien) => ({
    ...nhanvien,
    taiKhoan: nhanvien.taiKhoan * 1,
  }));

  newDanhSachNV.sort((a, b) => {
    return a.taiKhoan - b.taiKhoan;
  });

  setLocalNV(newDanhSachNV);

  renderDanhSachNhanVien(newDanhSachNV);
};
*/

// Modal Bootstrap
$(document).ready(function () {
  $("#sidebarCollapse").on("click", () => {
    $("#sidebar").toggleClass("active");
  });
});

$("#myModal").on("hidden.bs.modal", function () {
  $(this).find("form")[0].reset();
  // $(this).find("form").trigger("reset");
  // $("#myModal form")[0].reset();
  $(this).find(".sp-thongbao").hide();
  $("#btnCapNhat").removeAttr("data-dismiss", "modal");
});
