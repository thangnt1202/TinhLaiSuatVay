var typeSUM = "";   
        function clearTableBody() {
            var tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = '';
        } 
        function sumAction(){    
            clearTableBody();      
            if(typeSUM =="lcd"){
                functionGocLaiChiaDeu();
            }else if(typeSUM=="lgd"){
                functionSUMLaiGiamDan();
            }
            const exportButton = document.getElementById('export');
            const tbody = document.querySelector('#tableData tbody');
            // Lấy số lượng dòng trong tbody
            const rowCount = tbody.rows.length;
            // Nếu tbody có ít nhất một dòng, enable nút export
            if (rowCount > 0) {
                exportButton.disabled = false;
            } else {
                // Ngược lại, disable nút export
                exportButton.disabled = true;
            }
        }
        function checkTyping(input) {
            // Kiểm tra xem người dùng đã nhập dấu chấm vào hay chưa
            if (input.value.indexOf('.') !== -1) {
                // Tách phần số trước và sau dấu chấm
                var parts = input.value.split('.');
                var beforeDecimal = parts[0];
                var afterDecimal = parts[1];
                // Nếu có hơn một dấu chấm, loại bỏ dấu chấm mới
                if (input.value.split('.').length > 2) {
                    input.value = input.value.substring(0, input.value.length - 1);
                }
                // Kiểm tra xem phần trước dấu chấm có chứa ít nhất một số hay không
                if (!beforeDecimal || beforeDecimal === '') {
                    // Nếu không, loại bỏ dấu chấm đó
                    input.value = input.value.replace('.', '');
                    return;
                }
                
                // Nếu phần số sau dấu chấm có nhiều hơn 3 ký tự, cắt bớt đi
                if (afterDecimal && afterDecimal.length > 3) {
                    input.value = input.value.substring(0, input.value.length - 1);
                }
            }
        }
        function functionSUMLaiGiamDan() {
            var giaTriKhoanVay = $("#gtKhoanVay").val();
            giaTriKhoanVay = parseFloat(giaTriKhoanVay.replace(/\./g, '').replace(',', '.'));
            var tgVay = parseFloat($("#tgVay").val());
            var lsUuDai = parseFloat($("#lsUuDai").val())/100;
            var tgUuDai =  parseFloat($("#tgUuDai").val());
            var lsCoDinh = parseFloat($("#lsCoDinh").val())/100;
            var tgCoDinh = parseFloat($("#tgCoDinh").val());
            var laiPhaiTra = 0;
            var tienTraHangThang = 0;
            var gocPhaiTra = giaTriKhoanVay / tgVay;
            var duNo = giaTriKhoanVay
            var kyHanVay = tgVay / 12;
            var tongLai = 0;
            var tonggoc = 0;
            
            ///////////// LS ưu đãi
            if(lsUuDai >0){
                for (var i = 1; i <= tgUuDai; i++) {
                    //tienTraHangThang = (duNo+(duNo*lsUuDai*kyHanVay))/(tgVay-i+1);             
                    laiHangThang = (duNo * lsUuDai* kyHanVay) / tgVay;
                    gocPhaiTra = (duNo / (tgVay-i+1));
                    duNo = duNo - gocPhaiTra;
                    tienTraHangThang = laiHangThang + gocPhaiTra;
                    tonggoc = parseFloat(tonggoc) +parseFloat(tienTraHangThang);
                    tongLai = parseFloat(laiHangThang) + parseFloat(tongLai);
                   
                    // Xác định tbody
                    var tbody = document.querySelector('table tbody');
                    // Tạo một hàng mới
                    var newRow = document.createElement('tr');
                    // Thêm ô dữ liệu vào hàng mới
                    newRow.innerHTML = `
                    <td class="text-center">${i}</td>
                    <td class="text-center">${laiHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${gocPhaiTra.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${tienTraHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${duNo.toLocaleString('vi-VN')}</td>
                `;
                // Thêm hàng mới vào tbody
                tbody.appendChild(newRow);
                }
            }
            if(lsCoDinh >0)
            {
                    ///////////// LS cố định
                for (var i = 1; i <= tgCoDinh; i++) {
                    laiHangThang = (duNo * lsCoDinh* kyHanVay) / tgVay;
                    gocPhaiTra = (duNo / (tgVay- tgUuDai -i+1));
                    duNo = duNo - gocPhaiTra;
                    tienTraHangThang = laiHangThang + gocPhaiTra;
                    tonggoc = parseFloat(tonggoc) +parseFloat(tienTraHangThang);
                    tongLai = parseFloat(laiHangThang) + parseFloat(tongLai);
                
                    // Xác định tbody
                    var tbody = document.querySelector('table tbody');
                    // Tạo một hàng mới
                    var newRow = document.createElement('tr');
                    // Thêm ô dữ liệu vào hàng mới
                    newRow.innerHTML = `
                    <td class="text-center">${i + tgUuDai}</td>
                    <td class="text-center">${laiHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${gocPhaiTra.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${tienTraHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${duNo.toLocaleString('vi-VN')}</td>
                `;
                // Thêm hàng mới vào tbody
                tbody.appendChild(newRow);
                }
            }
            

            $("#tongLai").val(tongLai.toLocaleString('vi-VN'));
            $("#tongGoc").val(tonggoc.toLocaleString('vi-VN'));
        }
        function functionGocLaiChiaDeu(){
            var giaTriKhoanVay = $("#gtKhoanVay").val();
            giaTriKhoanVay = parseFloat(giaTriKhoanVay.replace(/\./g, '').replace(',', '.'));
            var tgVay = parseFloat($("#tgVay").val());
            var lsUuDai = parseFloat($("#lsUuDai").val())/100;
            var tgUuDai =  parseFloat($("#tgUuDai").val());
            var lsCoDinh = parseFloat($("#lsCoDinh").val())/100;
            var tgCoDinh = parseFloat($("#tgCoDinh").val());
            var tienTraHangThang = 0;
            var gocPhaiTra = 0;
            var duNo = giaTriKhoanVay
            var tongLai = 0;
            var tonggoc = 0;
            var lsHangThang =0;
            if(lsCoDinh >0 && tgCoDinh >0){
                lsHangThang = lsCoDinh/tgCoDinh;
                tienTraHangThang = (giaTriKhoanVay*lsHangThang*((1+lsHangThang)**tgVay))/(((1+lsHangThang)**tgVay)-1);
                ///////////// LS ưu đãi
                for (var i = 1; i <= tgCoDinh; i++) {             
                    laiHangThang = (duNo * lsHangThang);
                    gocPhaiTra = tienTraHangThang - laiHangThang;
                    duNo = Math.abs(duNo) - Math.abs(gocPhaiTra);
                    
                    tonggoc = parseFloat(tonggoc) +parseFloat(tienTraHangThang);
                    tongLai = parseFloat(laiHangThang) + parseFloat(tongLai);
                
                    // Xác định tbody
                    var tbody = document.querySelector('table tbody');
                    // Tạo một hàng mới
                    var newRow = document.createElement('tr');
                    // Thêm ô dữ liệu vào hàng mới
                    newRow.innerHTML = `
                    <td class="text-center">${i}</td>
                    <td class="text-center">${laiHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${gocPhaiTra.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${tienTraHangThang.toLocaleString('vi-VN')}</td>
                    <td class="text-center">${Math.abs(duNo).toLocaleString('vi-VN')}</td>
                `;
                // Thêm hàng mới vào tbody
                tbody.appendChild(newRow);
                }           
            }else{
                alert("Gốc,lãi chia đều hàng tháng chỉ áp dụng cho lãi suất cố định!")
            }
            $("#tongLai").val(tongLai.toLocaleString('vi-VN'));
            $("#tongGoc").val(tonggoc.toLocaleString('vi-VN'));
        }
        // Kết hợp việc đổi màu và kết nối giá trị cho các slider và input
        setupSlider('sliderGtKhoanVay', 'gtKhoanVay');
        setupSlider('sliderTgVay', 'tgVay');
        setupSlider('sliderLsUuDai', 'lsUuDai');
        setupSlider('sliderTgUuDai', 'tgUuDai');
        setupSlider('sliderLsCoDinh', 'lsCoDinh');
        setupSlider('sliderTgCoDinh', 'tgCoDinh');

        function setupSlider(sliderId, inputId) {
            var slider = document.getElementById(sliderId);
            var input = document.getElementById(inputId);

            // Kết nối giá trị của slider và input
            slider.addEventListener('input', function() {
                var formattedValue = parseFloat(this.value.replace(/\./g, '').replace(',', '.')) || 0;
                input.value = formattedValue.toLocaleString('vi-VN');
                var value = (this.value - this.min) / (this.max - this.min) * 100;
                this.style.background = "linear-gradient(to right, #4CAF50 0%, #4CAF50 " + value + "%, #ccc " + value + "%, #ccc 100%)";
            });
            input.addEventListener('input', function() {
                var formattedValue = parseFloat(this.value.replace(/\./g, '').replace(',', '.')) || 0;
                if(inputId ==="lsUuDai" || inputId =="lsCoDinh"){
                    formattedValue = parseFloat(this.value) || 0;
                }
                
                var maxValue =  parseFloat(input.getAttribute('max'));
                if(formattedValue > maxValue){
                    formattedValue = maxValue;
                }
                if(inputId !="lsUuDai" && inputId != "lsCoDinh"){
                    input.value = formattedValue.toLocaleString('vi-VN');
                }
                slider.value = formattedValue;
                var value = (slider.value - slider.min) / (slider.max - slider.min) * 100;
                slider.style.background = "linear-gradient(to right, #4CAF50 0%, #4CAF50 " + value + "%, #ccc " + value + "%, #ccc 100%)";
            });
        }
        // Hàm định dạng số thành dạng 1.000.000
        function formatNumber(number) {
            return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        }
        function selectCalculationMethod(button,typeSelected) {
            // Loại bỏ lớp 'selected' và đổi màu nền từ tất cả các nút
            var buttons = document.querySelectorAll('.btn');
            buttons.forEach(btn => {
                btn.classList.remove('selected');
                btn.style.backgroundColor = '';
            });
            // Đặt lớp 'selected' và đổi màu nền cho nút được chọn
            button.classList.add('selected');
            typeSUM = typeSelected;
        }
        function exportTableToExcel(tableID, filename = ''){
            var downloadLink;
            var dataType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            var tableSelect = document.getElementById(tableID);
            var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

            // Create a Blob from the table data
            var ws = XLSX.utils.table_to_sheet(tableSelect);
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            var wbout = XLSX.write(wb, {bookType:'xlsx', type:'binary'});
            
            function s2ab(s) {
                var buf = new ArrayBuffer(s.length);
                var view = new Uint8Array(buf);
                for (var i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
                return buf;
            }

            var blob = new Blob([s2ab(wbout)], {type: dataType});
            
            // Create a link element
            downloadLink = document.createElement("a");
            var date_export =getFormattedDate();
            // Specify the filename
            filename = filename ? filename +"_"+ date_export+'.xlsx' : 'excel_data.xlsx';

            // Add the link to the DOM
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;

            // Click the download link
            downloadLink.click();
        }
        function getFormattedDate() {
            var now = new Date();
            var year = now.getFullYear();
            var month = (now.getMonth() + 1).toString().padStart(2, '0');
            var day = now.getDate().toString().padStart(2, '0');
            var hours = now.getHours().toString().padStart(2, '0');
            var minutes = now.getMinutes().toString().padStart(2, '0');
            var seconds = now.getSeconds().toString().padStart(2, '0');

            return year + month + day + hours + minutes + seconds;
        }