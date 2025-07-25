from rest_framework.pagination import PageNumberPagination

class ToDOListPagination(PageNumberPagination):
    page_size_query_param='limit'
