// Hooks para usuarios
export { default as useFetchUsers } from './useFetchUsers.jsx';
export { default as useLoginUser } from './useLoginUser.jsx';
export { default as useRegisterUser } from './useRegisterUser.jsx';
export { default as useCreateUser } from './useRegisterUser.jsx'; // useCreateUser es el mismo que useRegisterUser
export { default as useUpdateUser } from './useUpdateUser.jsx';
export { default as useDeleteUser } from './useDeleteUser.jsx';


// Hooks para categorías
export { default as useFetchCategories } from './useFetchCategories.jsx';
export { default as useCreateCategory } from './useCreateCategory.jsx';
export { default as useDeleteCategory } from './useDeleteCategory.jsx';

// Hooks para productos
export { default as useFetchProducts } from './useFetchProducts.jsx';
export { default as useCreateProduct } from './useCreateProduct.jsx';
export { default as useFindProductById } from './useFindProductById.jsx';
export { default as useFindProductByName } from './useFindProductByName.jsx';
export { default as useUpdateProduct } from './useUpdateProduct.jsx';
export { default as useDeleteProduct } from './useDeleteProduct.jsx';
export { default as useGetProductStatus } from './useGetProductStatus.jsx';