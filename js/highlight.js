const select = document.getElementById('medicalservices');
const roomIds = ['101', '102', '103', '104', '105'];

document.querySelectorAll('td.highlight').forEach(td => td.classList.remove('highlight'));

const clearHighlights = () => {
    roomIds.forEach(id => {
      const row = document.getElementById(`room-${id}`);
      if (row) row.classList.remove('schedule-highlight');
    });
    document.querySelectorAll('td.highlight').forEach(td => td.classList.remove('highlight'));
};

const highlightRoom = (id) => {
    if (!id) return;
    const row = document.getElementById(`room-${id}`);
    if (row) row.classList.add('schedule-highlight');
    let dayCell, timeCell;
    if (id === '104' || id === '105') {
      const r104 = document.getElementById('room-104');
      if (r104) {
        const tds = r104.querySelectorAll('td');
        dayCell = tds[2];
        timeCell = tds[3];
      }

    } else if (row) {
      const tds = row.querySelectorAll('td');
      dayCell = tds[2];
      timeCell = tds[3];
    }
    if (dayCell) dayCell.classList.add('highlight');
    if (timeCell) timeCell.classList.add('highlight');
};
if (select) {
    select.addEventListener('change', (e) => {
      clearHighlights();
      const value = e.target.value;
      highlightRoom(value);
    });
    if (select.value) {
      clearHighlights();
      highlightRoom(select.value);
    }
if (form) {
  form.addEventListener('reset', () => {
    clearHighlights();
  });
}
}

