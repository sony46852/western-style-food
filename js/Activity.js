    const draggables = document.querySelectorAll('.draggable');
    let activeDraggable = null;
    let doubleClickTime = 0;
    let isRotating = false;

    let timerInterval;
    let seconds = 0;
    let minutes = 0;
    let hours = 0;
    const timerElement = document.getElementById('timer');

    function startTimer() {
        timerInterval = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
		imagesLocked = true;
        // 移除移動事件監聽器
        draggables.forEach(draggable => {
            draggable.removeEventListener('mousedown', onDragStart);
        });
    }

    function updateTimer() {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        timerElement.textContent = formattedTime;
    }

    function onDragStart(e) {
        if (e.button === 0) {
            e.preventDefault();
            const currentTime = new Date().getTime();

            if (currentTime - doubleClickTime < 300) {
                isRotating = true;
                activeDraggable = this;
                this.classList.add('rotating');
            } else {
                doubleClickTime = currentTime;
                isRotating = false;
                activeDraggable = this;
                this.classList.add('dragging');
            }

            const offsetX = e.clientX - this.getBoundingClientRect().left;
            const offsetY = e.clientY - this.getBoundingClientRect().top;

            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);

            function onMouseMove(e) {
                if (isRotating) {
                    const centerX = activeDraggable.offsetWidth / 2;
                    const centerY = activeDraggable.offsetHeight / 2;
                    const x = e.clientX - offsetX - activeDraggable.getBoundingClientRect().left - centerX;
                    const y = e.clientY - offsetY - activeDraggable.getBoundingClientRect().top - centerY;
                    const angle = Math.atan2(y, x);
                    activeDraggable.style.transform = `rotate(${angle}rad)`;
                } else {
                    const x = e.clientX - offsetX;
                    const y = e.clientY - offsetY;

                    //activeDraggable.style.width = 'auto';
                    //activeDraggable.style.height = 'auto';

                    activeDraggable.style.left = x + 'px';
                    activeDraggable.style.top = y + 'px';
                }
            }

            function onMouseUp() {
                activeDraggable.classList.remove(isRotating ? 'rotating' : 'dragging');
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
                activeDraggable = null;
            }
        }
    }

    // 增加移動事件監聽器
    draggables.forEach(draggable => {
        draggable.addEventListener('mousedown', onDragStart);
    });

    const dialog = document.querySelector('dialog');
    const closeButton = document.getElementById('closeButton');
    const completeButton = document.getElementById('completeButton');

   /* closeButton.addEventListener('click', () => {
    startTimer();
    dialog.close();
    draggables.forEach(draggable => {
        const leftAreaWidth = 500; // 設定左邊區塊
        const rightAreaWidth = 500; // 設定右邊區塊
        const maxXLeft = leftAreaWidth - draggable.clientWidth;
        const maxXRight = window.innerWidth - rightAreaWidth;
        const maxY = window.innerHeight - draggable.clientHeight;

        const randomXLeft = Math.random() * maxXLeft;
        const randomXRight = maxXRight + Math.random() * rightAreaWidth;
        const randomY = Math.random() * maxY;

        // 判斷圖片放在左邊還是右邊
        const randomX = Math.random() < 0.5 ? randomXLeft : randomXRight;

        draggable.style.left = randomX + 'px';
        draggable.style.top = randomY + 'px';
        draggable.style.transform = 'rotate(0deg)';
    });

    completeButton.style.display = 'block'; // 顯示完成按鈕
});*/
	
	//鎖定F12
	document.body.onkeydown = function(e){
		var keyCode = e.keyCode || e.which || e.charCode;
		var ctrlKey = e.ctrlKey || e.metaKey;
		if(ctrlKey && (keyCode == 83 || keyCode == 85 || keyCode == 73)) {
			e.preventDefault();
			return false;
		}
		else if(keyCode && keyCode == 123){
			return false;
		}
	}
	
	//鎖右鍵
	document.oncontextmenu = function (){
		return false;
	}
	
	//
