const data = [
    { organization: "org1", user: "jperez", role: "admin" },
    { organization: "org1", user: "jperez", role: "superadmin" },
    { organization: "org1", user: "asosa", role: "writer" },
    { organization: "org2", user: "jperez", role: "admin" },
    { organization: "org2", user: "rrodriguez", role: "writer" },
    { organization: "org2", user: "rrodriguez", role: "editor" },
  ];
  
  // Crear un objeto para almacenar el resultado
  const result = [];
  
  // Usar un mapa para agrupar los datos por organización y usuario
  const dataMap = new Map();
  
  for (const item of data) {
    const key = `${item.organization}_${item.user}`;
  
    if (!dataMap.has(key)) {
      dataMap.set(key, {
        organization: item.organization,
        username: item.user,
        roles: [],
      });
    }
  
    dataMap.get(key).roles.push(item.role);
  }
  
  // Convertir el mapa en un arreglo y agregarlo al resultado
  for (const value of dataMap.values()) {
    result.push({
      organization: value.organization,
      users: [
        {
          username: value.username,
          roles: value.roles,
        },
      ],
    });
  }
  
  console.log(JSON.stringify(result, null, 2));
  