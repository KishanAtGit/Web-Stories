import foodImage from '../assets/food.jpeg';
import fitnessImage from '../assets/healthAndFitness.jpeg';
import travel from '../assets/travel.jpeg';
import movies from '../assets/movies.jpeg';
import education from '../assets/education.jpeg';

const categories = [
  {
    _id: '1',
    name: 'Food',
    image: foodImage,
    stories: [
      {
        heading: 'Heading',
        description:
          'lorsdfsdgf grefskgfh hs iuhfish gusihg ihki shdgfi hshgi hsduoih sjk shgf s sedsg erdfrge rg',
        imageURL:
          'https://images.unsplash.com/photo-1723308627632-f3be27cb286f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description:
          'Descrfdsfsd fiu iuu hsihgfi hwsifgui wsl siuhgf hiugyh dskijg 6ds5g6+5 dsg kjshrfgsdgffdsgiption',
        imageURL:
          'https://images.unsplash.com/photo-1443131307017-4097c8ac7763?q=80&w=1956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description:
          'Descrgsfdgsdfg sfug uiwsfgyw ifsgouw uyifwshgfk s6f 4sgfuewiruyhgfo ifdsgfds sdfg fdsgiption',
        imageURL:
          'https://images.unsplash.com/photo-1492015185162-70eff4d54ef5?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Descript sdgf sfdg dsfgdsfg dsfion',
        imageURL:
          'https://images.unsplash.com/photo-1501200291289-c5a76c232e5f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Descrip dsfg dsfg dfgdfgtion',
        imageURL:
          'https://images.unsplash.com/photo-1484246402529-a5154bf9c0ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description:
          'Descrip sdfg dsfgdfsg dfg dfgdggds dsgegskgf hds  rgsidh jhgofdijhtion',
        imageURL:
          'https://images.unsplash.com/photo-1487831169122-e8b4ec408390?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    _id: '2',
    name: 'Health&Fitness',
    image: fitnessImage,
    stories: [
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1576678927484-cc907957088c?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://plus.unsplash.com/premium_photo-1690107504674-6676d8906132?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1591804671002-b24e17464f9b?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    _id: '3',
    name: 'Travel',
    image: travel,
    stories: [
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1516546453174-5e1098a4b4af?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=1886&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1723308627632-f3be27cb286f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1568849676085-51415703900f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    _id: '4',
    name: 'Movies',
    image: movies,
    stories: [
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://plus.unsplash.com/premium_photo-1684923604860-64e661f2ff72?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://plus.unsplash.com/premium_photo-1709065154785-39058d344949?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1545915154-c0fd0007b983?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1601128092089-35891312a94f?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1545630478-cf62cdd247d1?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
  {
    _id: '5',
    name: 'Education',
    image: education,
    stories: [
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1604342162684-0cb7869cc445?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://plus.unsplash.com/premium_photo-1664373233030-9e4f6fee47c5?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1524202503253-d461ec0ece86?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        heading: 'Heading',
        description: 'Description',
        imageURL:
          'https://images.unsplash.com/photo-1523889180787-5713eee897c0?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ],
  },
];

export default categories;
