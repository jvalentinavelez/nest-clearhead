interface SeedActivity {
  title: string;
  description: string;
  slug: string;
  tags: string[];
  images: string[];
  type: ValidTypes;
}

type ValidTypes = 'descanso' | 'estimulo' | 'calma';

interface SeedData {
  activities: SeedActivity[];
}

export const initialData: SeedData = {
  activities: [
    {
      title: 'Dormir',
      description: 'Preparémonos para un buen sueño',
      slug: 'dormir',
      tags: ['dormir', 'sleep'],
      images: ['image1.jpg', 'image2.jpg'],
      type: 'descanso',
    },
    {
      title: 'Respirar',
      description: 'Démonos un respiro',
      slug: 'respirar',
      tags: ['respirar', 'breathe'],
      images: ['image1.jpg', 'image2.jpg'],
      type: 'calma',
    },
    {
      title: 'Decluttering Digital',
      description: 'Conservemos lo esencial en nuestro espacio digital',
      slug: 'decluttering',
      tags: ['decluttering', 'despejar'],
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
      type: 'calma',
    },
    {
      title: 'Calma',
      description: 'Espacio para traer la calma y la serenidad',
      slug: 'calma',
      tags: ['calma', 'calm'],
      images: ['image1.jpg', 'image2.jpg'],
      type: 'calma',
    },
    {
      title: 'Atención',
      description: 'Trabajemos en la atención',
      slug: 'atencion',
      tags: ['atencion', 'attention'],
      images: ['image1.jpg'],
      type: 'estimulo',
    },
    {
      title: 'Creatividad',
      description: 'Espacio para crear',
      slug: 'creatividad',
      tags: ['creatividad', 'creativity', 'crear'],
      images: ['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
      type: 'estimulo',
    },
  ],
};
