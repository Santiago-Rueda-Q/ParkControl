export function normalizePlate(raw) {
    const s = String(raw ?? '')
        .toUpperCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/[‐-‒–—−]/g, '-') 
        .trim();

    // si ya viene como AAA-123
    if (/^[A-Z]{3}-\d{3}$/.test(s)) return s;

    // extrae de texto sucio: "AAA 123", "AAA_123", etc.
    const m = s.replace(/[^A-Z0-9]/g, ' ').match(/([A-Z]{3})\s*(\d{3})/);
    if (m) return `${m[1]}-${m[2]}`;

    // último intento: compactar y reinsertar guion
    const cleaned = s.replace(/[^A-Z0-9]/g, '');
    if (cleaned.length >= 6) return `${cleaned.slice(0,3)}-${cleaned.slice(3,6)}`;

    throw new Error('Placa inválida (formato esperado AAA-123).');
}
