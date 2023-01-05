export const getSensorIds = (data) => {
  const key = 'Id';
  const unique = [...new Set(data.map((item) => item[key]))];
  return unique;
};

export const getStatsOfSensor = (data, sensorId) => {
  const filtered = data.filter((obj) => obj.Id === sensorId);
  return filtered;
};

export const addSensorMenuItem = (sensorIds) => {
  const div = document.createElement('div');

  div.className = 'dropdown-menu';

  sensorIds.map((id) => {
    const a = document.createElement('a');
    a.className = 'dropdown-item';
    a.id = id;
    a.innerText = `Sensor ${id}`;
    div.appendChild(a);
  });
  const a = document.createElement('a');
  a.className = 'dropdown-item';
  a.id = 'allSensors';
  a.innerText = 'All';
  div.appendChild(a);

  document.getElementById('sensorsDropdown').appendChild(div);
};
