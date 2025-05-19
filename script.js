const devices = [
  { name: 'Fridge', icon: 'fridge' },
  { name: 'Bulb', icon: 'light' },
  { name: 'Socket', icon: 'power-socket' },
  { name: 'AC', icon: 'air-conditioner' },
  { name: 'TV', icon: 'tv' },
  { name: 'Oven', icon: 'microwave-oven' },
  { name: 'Fan', icon: 'fan' },
  { name: 'Heater', icon: 'radiator' }
];

let selectedDeviceIndex = null;

function renderDevices() {
  const list = document.getElementById("deviceList");
  list.innerHTML = devices.map((d, index) => `
    <div class="bg-white rounded-lg p-4 w-36 flex-shrink-0 relative shadow">
      <div class="absolute top-2 right-2 text-gray-500 text-xl cursor-pointer" onclick="toggleDeviceDropdown(this, ${index})">
        ⋮
        <div class="dropdown">
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="openDeviceRenameModal(${index})">Rename</div>
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="openChangeIconModal(${index})">Change Icon</div>
        </div>
      </div>
      <div class="flex items-start gap-2">
        <label class="inline-flex relative items-center cursor-pointer">
          <input type="checkbox" class="sr-only">
          <div class=\"master-toggle vertical-toggle\">
            <div class="knob"></div>
          </div>
        </label>
        <img src="https://img.icons8.com/ios/50/1e90ff/${d.icon}.png" class="w-10 h-10" alt="${d.name} Icon">
      </div>
      <p class="text-center text-sm font-semibold mt-2">${d.name}</p>
    </div>
  `).join('');
}

function toggleDeviceDropdown(el, index) {
  const dropdown = el.querySelector(".dropdown");
  const wasActive = dropdown.classList.contains("active");
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
  if (!wasActive) dropdown.classList.add("active");
  event.stopPropagation();
}

function openDeviceRenameModal(index) {
  selectedDeviceIndex = index;
  document.getElementById("deviceNameInput").value = devices[index].name;
  closeDropdowns();
  document.getElementById("deviceRenameModal").classList.remove("hidden");
  document.getElementById("deviceRenameModal").classList.add("flex");
}

function openChangeIconModal(index) {
  selectedDeviceIndex = index;
  renderIconChoices(index);
  closeDropdowns();
  document.getElementById("deviceIconModal").classList.remove("hidden");
  document.getElementById("deviceIconModal").classList.add("flex");
}

function renderIconChoices(index) {
  const icons = ['light', 'tv', 'fan', 'fridge', 'microwave-oven', 'air-conditioner', 'radiator'];
  const container = document.getElementById("iconChoices");
  container.innerHTML = icons.map(icon => `
    <img src="https://img.icons8.com/ios/50/1e90ff/${icon}.png" class="w-10 h-10 cursor-pointer" onclick="selectIcon('${icon}')">
  `).join('');
}

function selectIcon(iconName) {
  if (selectedDeviceIndex !== null) {
    devices[selectedDeviceIndex].icon = iconName;
    renderDevices();
    document.getElementById("deviceIconModal").classList.add("hidden");
  }
}

function closeDropdowns() {
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
}

document.getElementById("saveDeviceRenameBtn").onclick = () => {
  const newName = document.getElementById("deviceNameInput").value.trim();
  if (newName && selectedDeviceIndex !== null) {
    devices[selectedDeviceIndex].name = newName;
    renderDevices();
    document.getElementById("deviceRenameModal").classList.add("hidden");
  }
};

document.getElementById("cancelDeviceRenameBtn").onclick = () => {
  document.getElementById("deviceRenameModal").classList.add("hidden");
};

document.getElementById("masterToggle").addEventListener("click", () => {
  document.getElementById("masterToggle").classList.toggle("active");
});

window.addEventListener('click', function() {
  closeDropdowns();
  document.getElementById("deviceRenameModal").classList.add("hidden");
  document.getElementById("deviceIconModal").classList.add("hidden");
});

renderDevices();
const rooms = [];
    let selectedRoomIndex = null;
    const roomIcons = ['bedroom', 'kitchen', 'sofa', 'bath', 'living-room', 'garage', 'office'];
    let selectedRoomIcon = null;

    function addRoom() {
      document.getElementById("roomNameInput").value = "";
      renderRoomIcons();
      document.getElementById("roomModal").classList.remove("hidden");
      document.getElementById("roomModal").classList.add("flex");
    }

    function renderRoomIcons() {
      const container = document.getElementById("roomIconChoices");
      container.innerHTML = roomIcons.map(icon => `
        <img src="https://img.icons8.com/ios/50/1e90ff/${icon}.png" class="w-10 h-10 cursor-pointer border-2 rounded" onclick="selectRoomIcon('${icon}', this)">
      `).join('');
    }

    function selectRoomIcon(icon, el) {
      selectedRoomIcon = icon;
      document.querySelectorAll("#roomIconChoices img").forEach(img => img.classList.remove("border-blue-500"));
      el.classList.add("border-blue-500");
    }

    function closeRoomModal() {
      document.getElementById("roomModal").classList.add("hidden");
    }

    function saveRoom() {
      const name = document.getElementById("roomNameInput").value.trim();
      if (!name || !selectedRoomIcon) return;
      rooms.push({ name, icon: selectedRoomIcon });
      renderRooms();
      closeRoomModal();
    }

    function renderRooms() {
  const container = document.getElementById("roomList");
  container.innerHTML = rooms.map((room, index) => `
  <div class="bg-white p-2 rounded-lg shadow relative flex flex-col items-center text-xs h-36 w-full">


      <div class="absolute top-2 right-2 text-gray-500 text-xl cursor-pointer" onclick="toggleRoomDropdown(this, ${index})">
        ⋮
        <div class="dropdown">
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="renameRoom(${index})">Rename</div>
          <div class="px-4 py-2 hover:bg-gray-100 cursor-pointer" onclick="changeRoomIcon(${index})">Change Icon</div>
        </div>
      </div>
      <img src="https://img.icons8.com/ios/50/1e90ff/${room.icon}.png" class="w-8 h-8 mb-2" alt="${room.name} Icon">
      <p class="text-sm font-semibold text-center mb-2">${room.name}</p>
      <label class="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" class="sr-only">
        <div class="master-toggle vertical-toggle">
          <div class="knob"></div>
        </div>
      </label>
    </div>
  `).join('');
}


    function toggleRoomDropdown(el, index) {
      const dropdown = el.querySelector(".dropdown");
      const wasActive = dropdown.classList.contains("active");
      document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
      if (!wasActive) dropdown.classList.add("active");
      event.stopPropagation();
    }
    function renameRoom(index) {
  selectedRoomIndex = index;
  document.getElementById("roomRenameInput").value = rooms[index].name;
  document.getElementById("roomRenameModal").classList.remove("hidden");
  document.getElementById("roomRenameModal").classList.add("flex");
}

function saveRoomRename() {
  const newName = document.getElementById("roomRenameInput").value.trim();
  if (newName && selectedRoomIndex !== null) {
    rooms[selectedRoomIndex].name = newName;
    renderRooms();
    closeRoomRenameModal();
  }
}

function closeRoomRenameModal() {
  document.getElementById("roomRenameModal").classList.add("hidden");
}
function changeRoomIcon(index) {
  selectedRoomIndex = index;
  renderRoomIconChoicesModal();
  document.getElementById("roomIconModal").classList.remove("hidden");
  document.getElementById("roomIconModal").classList.add("flex");
}

function renderRoomIconChoicesModal() {
  const container = document.getElementById("roomIconModalChoices");
  container.innerHTML = roomIcons.map(icon => `
    <img src="https://img.icons8.com/ios/50/1e90ff/${icon}.png" class="w-10 h-10 cursor-pointer border-2 rounded" onclick="selectRoomIconModal('${icon}', this)">
  `).join('');
}

function selectRoomIconModal(icon, el) {
  if (selectedRoomIndex !== null) {
    rooms[selectedRoomIndex].icon = icon;
    renderRooms();
    closeRoomIconModal();
  }
}

function updateDateTime() {
  const now = new Date();
  const dateOptions = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

  document.getElementById("dateDisplay").textContent = now.toLocaleDateString('en-US', dateOptions);
  document.getElementById("timeDisplay").textContent = now.toLocaleTimeString('en-US', timeOptions);
}

// Initial call
updateDateTime();
// Keep updating every second
setInterval(updateDateTime, 1000);

const allItems = [
  "Fridge", "Bulb", "Socket", "AC", "TV", "Oven", "Fan", "Heater",
  "Bedroom", "Living Room", "Kitchen", "Office", "Garage"
];

function openSearch() {
  document.getElementById("searchModal").classList.remove("translate-y-full");
  document.getElementById("searchOverlay").classList.remove("hidden");
}

function closeSearch() {
  document.getElementById("searchModal").classList.add("translate-y-full");
  document.getElementById("searchOverlay").classList.add("hidden");
}

function filterResults() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  const filtered = allItems.filter(item => item.toLowerCase().includes(input));

  resultsContainer.innerHTML = filtered.length
    ? filtered.map(item => `<div class="p-2 bg-gray-100 rounded">${item}</div>`).join("")
    : `<div class="text-gray-400 italic">No results found</div>`;
}
