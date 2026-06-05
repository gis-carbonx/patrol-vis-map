# Wildlife Monitoring Web GIS

Interactive Web GIS for patrol monitoring, wildlife camera trap management, forest disturbance alerts, and fire event monitoring.

![Platform](docs/dashboard.png)

## Overview

This application integrates field patrol data, camera trap observations, forest disturbance alerts, and fire detections into a single web-based monitoring platform.

The system supports conservation monitoring, patrol management, wildlife observation, and spatial analysis through an interactive GIS dashboard.

---

## Main Features

### Patrol Monitoring

- Patrol point visualization
- Patrol track visualization
- Finding categorization
- Officer-based filtering
- Date range filtering
- Observation detail panel

### Camera Trap Monitoring

- Camera trap location mapping
- Detection intensity grid
- Species monitoring
- IUCN status summary
- Trap-night statistics
- Species detection analysis

### Disturbance Monitoring

- Global Forest Watch (GFW) alert integration
- Confidence level filtering
- Temporal disturbance monitoring

### Fire Monitoring

- NASA FIRMS hotspot integration
- Satellite-based fire detection
- Land cover and administrative filtering

### Spatial Layers

- Project boundary
- Land Cover 2023
- Land Cover 2025
- Patrol tracks
- Camera trap grid

---

## Technology Stack

| Component | Technology |
|------------|------------|
| Frontend | HTML, CSS, JavaScript |
| Mapping | Leaflet |
| Data Source | Google Sheets, GeoJSON |
| Visualization | Leaflet Marker Cluster |
| Hosting | GitHub Pages |

---

## Data Sources

| Dataset | Source |
|----------|----------|
| Patrol Data | Field Survey |
| Camera Trap Data | Wildlife Monitoring Program |
| Fire Alert | NASA FIRMS |
| Disturbance Alert | Global Forest Watch |
| Basemap | Esri, Google, OpenStreetMap |
| Land Cover | Internal Classification |

---

## System Architecture

```text
Google Sheets
      │
      ▼
 JavaScript
      │
      ▼
 Leaflet Web GIS
      │
 ├── Patrol Monitoring
 ├── Camera Trap Monitoring
 ├── Fire Monitoring
 └── Disturbance Monitoring
```

---

## Project Structure

```text
.
├── index.html
├── data/
│   ├── boundary.geojson
│   ├── patrol.geojson
│   ├── camera_trap.geojson
│   ├── lulc_2023.geojson
│   └── lulc_2025.geojson
├── docs/
│   └── dashboard.png
└── README.md
```

---

## Key Capabilities

- Integrated patrol monitoring dashboard
- Wildlife camera trap analysis
- Forest disturbance alert monitoring
- Fire detection monitoring
- Multi-basemap support
- Interactive filtering and statistics
- Cloud-based deployment using GitHub Pages

---


## Future Development

- 

---

## License

This project is developed for environmental monitoring inside PT CMI environment.
