document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let drawing = false;
    let currentColor = 'black';
    let erasing = false;

    // Farbwahl-Logik
    document.querySelectorAll('.color').forEach(button => {
        button.addEventListener('click', () => {
            currentColor = button.dataset.color;
            erasing = false;
        });
    });

    // Radiergummi-Logik
    document.getElementById('eraser').addEventListener('click', () => {
        erasing = true;
    });

    canvas.addEventListener('mousedown', () => drawing = true);
    canvas.addEventListener('mouseup', () => {
        drawing = false;
        ctx.beginPath();
    });
    canvas.addEventListener('mousemove', draw);

    function draw(event) {
        if (!drawing) return;
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = erasing ? 'white' : currentColor;
        ctx.lineTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(event.clientX - canvas.offsetLeft, event.clientY - canvas.offsetTop);
    }

    // Bild hochladen und zum Inventar hinzufügen
    document.getElementById('uploadImage').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append('image', file);

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(filename => {
            const img = document.createElement('img');
            img.src = '/static/uploads/' + filename;
            img.className = 'uploaded-image';
            document.getElementById('uploadedImages').appendChild(img);

            // Ziehbare Bilder
            img.addEventListener('dragstart', (e) => {
                e.dataTransfer.setData('text/plain', e.target.src);
            });
        });
    });

    // Ziehen und Ablegen der Bilder auf dem Canvas
    canvas.addEventListener('dragover', (e) => {
        e.preventDefault();
    });

    canvas.addEventListener('drop', (e) => {
        e.preventDefault();
        const imgSrc = e.dataTransfer.getData('text/plain');
        const img = new Image();
        img.src = imgSrc;
        img.onload = () => {
            ctx.drawImage(img, e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop, img.width / 2, img.height / 2);
        };
    });
});
