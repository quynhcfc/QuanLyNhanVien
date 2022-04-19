let layThongTinForm = function () {
  let taiKhoanNV = document.getElementById("tknv").value;
  let tenNV = document.getElementById("name").value;
  let emailNV = document.getElementById("email").value;
  let matKhau = document.getElementById("password").value;
  let ngayBatDau = document.getElementById("datepicker").value;
  let luongNV = document.getElementById("luongCB").value;
  let gioLamNV = document.getElementById("gioLam").value;
  let chucVuNV =
    document.getElementById("chucvu").options[
      document.getElementById("chucvu").selectedIndex
    ].value;

  let xepLoaiNV = () => {
    let gioLamHienTai = gioLamNV * 1;

    if (gioLamHienTai >= 192) {
      return "Xuất sắc";
    } else if (gioLamHienTai >= 176) {
      return "Giỏi";
    } else if (gioLamHienTai >= 160) {
      return "Khá";
    } else if (gioLamHienTai < 160) {
      return "Trung bình";
    }
  };

  let nv = new NhanVien(
    taiKhoanNV,
    tenNV,
    emailNV,
    matKhau,
    ngayBatDau,
    luongNV,
    chucVuNV,
    gioLamNV,
    xepLoaiNV()
  );
  return nv;
};

let renderDanhSachNhanVien = (danhSachNhanVienArr) => {
  let contentHTML = "";

  for (let i = 0; i < danhSachNhanVienArr.length; i++) {
    let nhanVienHienTai = danhSachNhanVienArr[i];

    // Tính lương nhân viên
    let tinhLuongNV = () => {
      let giamDoc = "Giám đốc";
      let truongPhong = "Trưởng phòng";
      let nhanVien = "Nhân viên";

      let luongHienTai = nhanVienHienTai.luong * 1;
      let chucVuHienTai = nhanVienHienTai.chucVu;

      if (chucVuHienTai === giamDoc) {
        return (luongHienTai * 3).toLocaleString();
      } else if (chucVuHienTai === truongPhong) {
        return (luongHienTai * 2).toLocaleString();
      } else if (chucVuHienTai === nhanVien) {
        return (luongHienTai * 1).toLocaleString();
      }
    };

    // Xuất bảng nhân viên
    let contentTr = `<tr>
        <td>${nhanVienHienTai.taiKhoan}</td>
        <td>${nhanVienHienTai.ten}</td>
        <td>${nhanVienHienTai.email}</td>
        <td>${nhanVienHienTai.ngayLam}</td>
        <td>${nhanVienHienTai.chucVu}</td>
        <td>${tinhLuongNV()}</td>
        <td>${nhanVienHienTai.xepLoai}</td>
        <td class="">
          <button class="btn btn-success my-1" data-toggle="modal" data-target="#myModal" onclick="suaNhanVien(${
            nhanVienHienTai.taiKhoan
          })">Sửa</button>
          <button class="btn btn-danger  my-1" onclick="xoaNhanVien(${
            nhanVienHienTai.taiKhoan
          })">Xóa</button>
        </td>
    </tr>`;

    contentHTML = contentHTML + contentTr;
  }

  document.getElementById("tableDanhSach").innerHTML = contentHTML;
};

var nhanVienLocal = "nhanVienLocal";

let setLocalNV = (array) => {
  let json = JSON.stringify(array);
  localStorage.setItem(nhanVienLocal, json);
};
