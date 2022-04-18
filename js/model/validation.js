var validatorNV = {
  kiemTraRong: (string, idErr, message) => {
    let value = string.trim();

    if (value.length > 0) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText = message;
    return false;
  },

  kiemTraTrungTaiKhoan: (taiKhoanNew, danhSachNhanVienArr) => {
    var index = danhSachNhanVienArr.findIndex((nv) => {
      return nv.taiKhoan === taiKhoanNew;
    });

    if (index == -1) {
      document.getElementById("tbTKNV").innerText = "";
      return true;
    }
    document.getElementById("tbTKNV").innerText = "Tài khoản bị trùng";
    return false;
  },

  kiemTraTaiKhoan: (string, idErr) => {
    if (4 <= string.length && string.length <= 6) {
      let isValid = validator.isNumeric(string);

      if (isValid) {
        document.getElementById(idErr).innerText = "";
        return true;
      }
      document.getElementById(idErr).innerText = "Tài khoản phải là số";
      return false;
    }
    document.getElementById(idErr).innerText = "Tài khoản từ 4 - 6 số";
    return false;
  },

  kiemTraTen: (string, idErr) => {
    let isValid = validator.isNumeric(string);

    if (!isValid) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText = "Họ tên phải là chữ";
    return false;
  },

  kiemTraEmail: (string, idErr) => {
    let isValid = validator.isEmail(string);

    if (isValid) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText = "Email chưa đúng!";
    return false;
  },

  kiemTraPassword: (string, idErr) => {
    if (6 <= string.length && string.length <= 10) {
      let isValid = validator.isStrongPassword(string);
      if (isValid) {
        document.getElementById(idErr).innerText = "";
        return true;
      }
      document.getElementById(idErr).innerText =
        "Mật khẩu có ít nhất 1 ký tự in hoa, 1 ký tự in thường, 1 ký tự số, 1 ký tự đặc biệt";
      return false;
    } else {
      document.getElementById(idErr).innerText = "Mật khẩu 6 - 10 ký tự";
      return false;
    }
  },

  kiemTraLuong: (num, idErr) => {
    if (1000000 <= num && num <= 20000000) {
      document.getElementById(idErr).innerText = "";
      return true;
    } else {
      document.getElementById(idErr).innerText =
        "Lương trong khoảng 1.000.000 - 20.000.000";
      return false;
    }
  },

  kiemTraGioLam: (num, idErr) => {
    if (80 <= num && num <= 200) {
      document.getElementById(idErr).innerText = "";
      return true;
    }
    document.getElementById(idErr).innerText =
      "Số giờ làm trong khoảng 80 - 200";
    return false;
  },
};
