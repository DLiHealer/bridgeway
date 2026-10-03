import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { categoryById } from '../../data';
import { Button } from '../ui';
import { isSensitive, coarsenCoords, APPROX_RADIUS_M } from '../../utils/privacy';

function coloredDot(color, shape = 'circle') {
  const html = shape === 'diamond'
    ? `<div style="width:16px;height:16px;background:${color};transform:rotate(45deg);border:2px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.3);border-radius:2px"></div>`
    : `<div style="width:16px;height:16px;background:${color};border:2px solid #fff;border-radius:999px;box-shadow:0 1px 4px rgba(0,0,0,.3)"></div>`;
  return L.divIcon({ html, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
}

export default function MapView({ items = [], height = '100%', zoom = 6, center = [52.0692, 19.4803] }) {
  const { t } = useTranslation();
  return (
    <MapContainer center={center} zoom={zoom} style={{ height, width: '100%' }} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map(item => {
        const cat = categoryById(item.category);
        const shape = item.type === 'idea' ? 'diamond' : 'circle';
        const sensitive = isSensitive(item);
        const pos = sensitive ? coarsenCoords(item.coords || [52.2, 21]) : (item.coords || [52.2, 21]);
        const popup = (
            <Popup>
              <div className="w-56">
                <p className="text-xs font-medium" style={{ color: cat.color }}>{cat.name}</p>
                <p className="mt-1 font-semibold text-neutral-900">{item.title}</p>
                <p className="text-xs text-neutral-400">{item.city}{sensitive && ` · ${t('legal.approxArea')}`}</p>
                {item.onBehalf && <p className="mt-1 text-xs text-brand-600">{t('submit.proxyBadge')}</p>}
                <p className="mt-2 line-clamp-2 text-xs text-neutral-700">{item.description}</p>
                <div className="mt-3 flex gap-2">
                  <Link to={item.type === 'idea' ? `/pomysly/${item.id}` : `/mapa?focus=${item.id}`}>
                    <Button size="sm" variant="secondary">Szczegóły</Button>
                  </Link>
                </div>
              </div>
            </Popup>
        );
        return sensitive ? (
          <Circle key={item.id} center={pos} radius={APPROX_RADIUS_M} pathOptions={{ color: cat.color, fillColor: cat.color, fillOpacity: 0.25, weight: 2 }}>{popup}</Circle>
        ) : (
          <Marker key={item.id} position={pos} icon={coloredDot(cat.color, shape)}>{popup}</Marker>
        );
      })}
    </MapContainer>
  );
}