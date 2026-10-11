function angleClock(hour: number, minutes: number): number {
    const angle = Math.abs((hour % 12) * 30 + minutes * 0.5 - minutes * 6);
    return Math.min(angle, 360 - angle);
}
