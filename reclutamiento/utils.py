import inflect

def numero_a_letras(num):
    """Convierte un número en su representación en palabras"""
    p = inflect.engine()
    palabras = p.number_to_words(num, andword='', zero='cero', threshold=None).upper()
    
    return palabras
