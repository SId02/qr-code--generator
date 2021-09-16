function qrcodeGen() {
	const generateBtn = document.querySelector("#generateBtn");
	const urlInput = document.querySelector("#urlInput");
	const downloadBtn = document.querySelector("#downloadBtn");
	const qrcode = document.querySelector("#qrcode");
	const qrcard = document.querySelector(".card");

	const errorClass = "is-danger";
	const hideClass = "is-hidden";
	const qrcardClass = "qrcard";

	var QR_CODE = new QRCode("qrcode", {
		width: 260,
		height: 260,
		colorDark: "#000000",
		colorLight: "#ffffff",
		correctLevel: QRCode.CorrectLevel.H,
	});

	generateBtn.onclick = function (e) {
		e.preventDefault();
		const data = urlInput.value;
		if (data) {
			generateQRCode(data);
		} else {
			markDataBoxError();
		}
	};

	downloadBtn.onclick = function (e) {
		const canvas = qrcode.getElementsByTagName("canvas")[0];
		canvas.width = canvas.width;
		canvas.height = canvas.height;

		const context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle = "#fff";
		context.fillRect(0, 0, canvas.width, canvas.height);

		const image = canvas.toDataURL("image/png", 1);
		const filename = "QR_Code_" + Date.now() + ".png";
		downloadImage(image, filename);
	};

	function markDataBoxError() {
		const prevClassName = urlInput.className;
		urlInput.className = prevClassName + " " + errorClass;
		setTimeout(() => {
			urlInput.className = prevClassName + " " + errorClass;
		}, 500);
	}

	function generateQRCode(data) {
		QR_CODE.clear();
		QR_CODE.makeCode(data);
		qrcard.className = qrcardClass;
	}

	function downloadImage(image, filename) {
		var element = document.createElement("a");
		element.setAttribute("href", image);
		element.setAttribute("download", filename);
		element.setAttribute("class", hideClass);
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}
}

qrcodeGen();
